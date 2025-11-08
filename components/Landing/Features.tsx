'use client'

import { motion } from 'framer-motion'
import { Zap, Users, Video, Brain, BarChart3, Lock } from 'lucide-react'

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const features = [
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI-powered algorithm instantly matches candidates to jobs in seconds, not weeks',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Video,
      title: 'Video Resumes',
      description: 'Record or upload video introductions to showcase personality and communication skills',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Brain,
      title: 'AI Screening',
      description: 'Advanced AI evaluates candidates on technical skills, soft skills, and cultural fit',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Network Building',
      description: 'Connect with professionals, follow companies, and build meaningful relationships',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Real-time insights on hiring metrics, candidate pipeline, and hiring trends',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with end-to-end encryption and GDPR compliance',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Hiring
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to find, assess, and hire top talent faster
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="p-8 rounded-2xl border-2 border-gray-100 hover:border-primary-300 transition-all bg-gradient-to-br from-white to-gray-50"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
