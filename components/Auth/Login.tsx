'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Linkedin, Chrome, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-card-hover p-8 md:p-10">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">HireGo</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-900 mt-4">
              Welcome Back
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600 mt-2">
              Sign in to your account to continue
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Social Login */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <Linkedin className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Sign in with LinkedIn</span>
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <Chrome className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">Sign in with Google</span>
            </motion.button>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">Or sign in with email</span>
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-primary-600 hover:underline font-medium">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.label
              variants={itemVariants}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 font-medium">Remember me</span>
            </motion.label>

            {/* Sign In Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-card transition-all mt-6"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Sign Up Link */}
            <motion.p variants={itemVariants} className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary-600 hover:underline font-bold">
                Sign up
              </a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
