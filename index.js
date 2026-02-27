require('dotenv').config({ path: './backend.env' }); // 9. Environment vars for secrets (JWT_SECRET, CLIENT_URL, PORT)
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const app = express();

// 3. Helmet for secure HTTP headers (CSP, X-Contnet-Type-Options, etc.)
app.use(helmet());

// 3. CORS restricted to specific origin
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://my-pwa.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with size limit to prevent DoS
app.use(express.json({ limit: '10kb' }));

// 4. Rate Limiting Configuration
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Strict limit for login (5 req/min)
    message: { error: 'Too many login attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100, // General limit (100 req/min)
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Mock Database (In-memory)
// 6. Note: In a real app, use an ORM (Prisma/TypeORM) or parameterized queries to prevent SQL Injection.
// Using array methods here is inherently safe effectively acting as parameterized storage.
const users = [];
const orders = [];

/* --- 2. Input Validation Schemas (Zod) --- */
const registerSchema = z.object({
    email: z.string().email(),
    // 5. Password strong requirements enforced
    password: z.string().min(8).regex(/[A-Z]/, "Must contain uppercase").regex(/[0-9]/, "Must contain number"),
    role: z.enum(['customer', 'admin']).default('customer') // Strict role allowlist
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const orderSchema = z.object({
    productId: z.string().min(1), // Validate ID format (e.g., .uuid() if applicable)
    quantity: z.number().int().positive(),
    stripeToken: z.string().min(1) // 7. Stripe token stub validation
});

/* --- Authentication Middleware --- */
// 1. JWT Authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// 1. Role-Based Access Control (RBAC)
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

/* --- ROUTES --- */

// 2. & 5. Secure Registration
app.post('/register', apiLimiter, async (req, res, next) => {
    try {
        // Validate Input
        const { email, password, role } = registerSchema.parse(req.body);

        // Check existing user to prevent duplicates
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // 5. Bcrypt Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user (Store HASH, never plain text)
        const newUser = {
            id: Date.now(),
            email,
            password: hashedPassword,
            role
        };
        users.push(newUser);

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        next(error);
    }
});

// 2. & 4. Secure Login
app.post('/login', authLimiter, async (req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = users.find(u => u.email === email);

        // Generic error message to prevent User Enumeration
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        // 5. Secure Password Comparison
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        // 1. Generate Signed JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

// 1., 2. & 7. Secure Orders (Authenticated Customers Only)
app.post('/orders', apiLimiter, authenticateToken, requireRole('customer'), (req, res, next) => {
    try {
        const validatedOrder = orderSchema.parse(req.body);

        // 7. Stripe Integration Stub (No Sensitive Data Storage)
        // In production: await stripe.charges.create({ amount: ..., source: validatedOrder.stripeToken });
        console.log(`Processing payment for user ${req.user.id} with token ${validatedOrder.stripeToken}`);

        // Store order securely linked to authenticated user
        const newOrder = {
            id: orders.length + 1,
            userId: req.user.id,
            ...validatedOrder
        };
        // Note: Don't save stripeToken to DB if not needed/PCI compliant
        delete newOrder.stripeToken;

        orders.push(newOrder);
        res.json({ id: newOrder.id });
    } catch (error) {
        next(error);
    }
});

// 1. & 2. Admin Route (Strictly Protected)
app.get('/admin/users', apiLimiter, authenticateToken, requireRole('admin'), (req, res) => {
    // 6. Data Sanitization: Never return password hashes
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
});

/* --- 8. Error Handling --- */
app.use((err, req, res, next) => {
    // Zod Validation Errors
    if (err instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }

    // Log full error securely on backend
    console.error("Internal Server Error:", err);

    // 8. Generic error response to client (No stack traces)
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));
