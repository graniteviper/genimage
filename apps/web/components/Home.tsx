'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {useRouter} from "next/navigation";

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter();

  // Ensure the theme is mounted before rendering (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}>
      {/* Hero Section */}
      <section className={`px-6 py-20 text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Train Your Own AI Image Generator
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Upload your images, train a custom AI model, and generate unique visuals tailored to your data.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" onClick={() => router.push('/dashboard')}>Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Everything you need to build your own image model.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Custom Training",
              desc: "Upload your own dataset to create models unique to your needs."
            },
            {
              title: "Fast Generation",
              desc: "Generate high-quality images in seconds after training."
            },
            {
              title: "Intuitive Interface",
              desc: "No code needed. Just upload, train, and generate."
            }
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`px-6 py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Pricing</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Simple pricing for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              plan: "Free",
              price: "$0",
              features: ["Upload up to 10 images", "Basic training", "Limited generations"]
            },
            {
              plan: "Pro",
              price: "$19/mo",
              features: ["Unlimited image uploads", "Advanced training", "HD image generation"]
            },
            {
              plan: "Enterprise",
              price: "Custom",
              features: ["API access", "Team support", "Custom features"]
            }
          ].map((tier, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {tier.plan} <Badge variant="outline">{tier.price}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  {tier.features.map((f, j) => <li key={j}>• {f}</li>)}
                </ul>
                <Button className="mt-4 w-full">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Users Say</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join thousands of happy creators.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Alex J.",
              feedback: "I trained a model on my art style and now I can generate artwork in seconds. This is next level!"
            },
            {
              name: "Taylor M.",
              feedback: "Super intuitive platform. No coding, just results. The AI model nailed it after a few uploads."
            }
          ].map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-md transition">
                <CardContent className="pt-6">
                  <p className="text-gray-800 dark:text-gray-100 italic">"{t.feedback}"</p>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">— {t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-10 text-sm ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 YourAI. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
