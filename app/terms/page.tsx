import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
          >
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Campus Eats" fill className="object-contain" />
            </div>
            <span className="font-semibold text-base">Campus Eats</span>
          </Link>

          <Link href="/">
            <Button className="rounded-full bg-white/80 backdrop-blur-md border-2 border-gray-300 text-black hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md px-8 py-5 text-base">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
            Terms <span className="text-orange-500">&</span> Conditions
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Campus Eats. By accessing and using our food delivery service, you agree to be bound by these
                Terms and Conditions. Please read them carefully before placing an order.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Campus Eats provides a platform for ordering food from various campus restaurants and cafeterias, with
                delivery to your specified location on campus. We act as an intermediary between you and the food
                vendors.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">To use our service, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be a registered student or staff member of the campus</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Orders and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">When placing an order:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All prices are in the local currency and include applicable taxes</li>
                <li>Payment must be completed before order processing begins</li>
                <li>We accept various payment methods as displayed during checkout</li>
                <li>Orders are subject to availability and acceptance by the vendor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">5. Delivery</h2>
              <p className="text-gray-700 leading-relaxed">
                Delivery times are estimates and may vary based on order volume, weather conditions, and other factors.
                We strive to deliver your food hot and fresh to your specified campus location.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Cancellations and Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Cancellation and refund policies:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Orders can be cancelled within 2 minutes of placement for a full refund</li>
                <li>After preparation begins, cancellations may not be possible</li>
                <li>Refunds for quality issues will be handled on a case-by-case basis</li>
                <li>Contact customer support for refund requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">7. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Harass, abuse, or harm delivery personnel or customer service staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">8. Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. We collect and use your personal information in accordance with our
                Privacy Policy. By using Campus Eats, you consent to our collection and use of your information as
                described.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Campus Eats is not liable for any indirect, incidental, special, or consequential damages arising from
                your use of the service. Our total liability shall not exceed the amount paid for the specific order in
                question.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                immediately upon posting. Your continued use of the service after changes constitutes acceptance of the
                modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms and Conditions, please contact us at support@campuseats.com or through
                our customer service channels.
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-100 rounded-2xl">
              <p className="text-sm text-gray-600 text-center">Last Updated: January 2025</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
