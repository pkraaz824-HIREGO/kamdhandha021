'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, BarChart3 } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-dark-900 via-slate-900 to-primary-900 text-white px-4 py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-primary-300">✨ AI-Powered Hiring Revolution</p>
                </motion.div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hire Top Talent in <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">30 Minutes</span>
              </h1>
              <p className="text-xl text-gray-300">
                The next-generation LinkedIn meets instant hiring. AI-screened candidates, AI-matched jobs, and lightning-fast recruitment.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/registration/candidate"
                className="px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 rounded-xl font-bold text-gray-900 flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
              >
                <span>Register as Candidate</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/dashboard/employer"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
              >
                <span>Register as Employer</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8">
              {[
                { label: 'Candidates', value: '50K+' },
                { label: 'Companies', value: '2K+' },
                { label: 'Hires/Week', value: '500+' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-3xl font-bold text-primary-400">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-[500px] hidden lg:block"
          >
            {/* Animated card stack */}
            <div className="absolute inset-0 flex items-center justify-center perspective">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-80 h-48 bg-gradient-to-br from-primary-500/30 to-blue-500/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white">Sarah Chen</p>
                      <p className="text-xs text-gray-300">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                    <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <span className="px-2 py-1 bg-primary-500/40 rounded text-xs text-white font-medium">AI Match: 94%</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating circles background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-64 h-64 border-2 border-primary-500/20 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute w-96 h-96 border-2 border-blue-500/20 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { icon: Zap, title: 'Instant Matching', desc: 'AI-powered candidate matching in seconds' },
            { icon: Users, title: 'Video Resumes', desc: 'Showcase personality and communication skills' },
            { icon: BarChart3, title: 'Smart Analytics', desc: 'Real-time hiring metrics and insights' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.2)' }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary-500/50 transition-all"
            >
              <feature.icon className="w-8 h-8 text-primary-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
