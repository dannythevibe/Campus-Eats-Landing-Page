# Campus Eats - Complete Project

This repository contains the complete Campus Eats platform with both the landing page and the main web application.

## Project Structure

```
Campus-Eats-Landing-Page-main/
├── app/                    # Next.js landing page
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Landing page components
├── public/               # Landing page assets
├── webapp/               # Main web application (Vite + React)
│   ├── src/
│   │   ├── customers/   # Customer pages & components
│   │   ├── auth/        # Authentication
│   │   └── context/     # State management
│   ├── public/          # Webapp assets
│   └── package.json     # Webapp dependencies
└── package.json         # Landing page dependencies
```

## Two Applications

### 1. Landing Page (Next.js)
The marketing/landing page built with Next.js 15, React 19, and Tailwind CSS.

**Features:**
- Hero section with animated clouds
- Why We Exist section
- Features showcase
- How It Works section
- Mobile app mockups
- FAQ accordion
- Footer with social media links

**Run the landing page:**
```bash
npm run dev
```
Runs on: `http://localhost:3000`

### 2. Web Application (Vite + React)
The main application for customers and vendors built with Vite, React 19, and TypeScript.

**Features:**
- User authentication (Supabase)
- Customer dashboard
- Restaurant browsing
- Menu viewing
- Order management
- Vendor dashboard (coming soon)

**Run the webapp:**
```bash
npm run dev:webapp
```
Runs on: `http://localhost:5173`

## Getting Started

### Install All Dependencies

**1. Install landing page dependencies:**
```bash
npm install
```

**2. Install webapp dependencies:**
```bash
npm run install:webapp
# or manually:
cd webapp && npm install
```

### Development

**Run landing page only:**
```bash
npm run dev
```

**Run webapp only:**
```bash
npm run dev:webapp
```

**Run both (in separate terminals):**
```bash
# Terminal 1 - Landing page
npm run dev

# Terminal 2 - Web application
npm run dev:webapp
```

### Build for Production

**Build landing page:**
```bash
npm run build
```

**Build webapp:**
```bash
npm run build:webapp
```

**Build both:**
```bash
npm run build:all
```

## Tech Stack

### Landing Page
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Custom CSS animations

### Web Application
- **Framework:** Vite + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Bootstrap
- **Auth:** Supabase
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **State:** React Context API

## Integration

The landing page "Get Started" button can link to the webapp:
- **Development:** Link to `http://localhost:5173`
- **Production:** Link to deployed webapp URL

## Team Collaboration

This project integrates work from multiple team members:
- **Landing Page:** Marketing website with branding and information
- **Web Application:** Full-featured customer and vendor platform

Both applications are kept separate to maintain their own tech stacks and development workflows, while being organized in a single repository for easy collaboration.

## Links

- **Instagram:** [the_campuseats](https://www.instagram.com/the_campuseats?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr)
- **Snapchat:** [Campus Eats](https://snapchat.com/t/cNgjnHRD)
- **GitHub:** [campus-eatspace](https://github.com/campus-eatspace/campus-eatspace.git)
