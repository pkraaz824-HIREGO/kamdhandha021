'use client'

import { useState } from 'react'
import { Mail, Phone, ChevronRight, Linkedin, Chrome } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email')

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
              Join HireGo
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600 mt-2">
              {step === 1
                ? 'Create your professional profile'
                : 'Verify your identity'}
            </motion.p>
          </motion.div>

          {step === 1 ? (
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
                <span className="font-medium text-gray-700">Sign up with LinkedIn</span>
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
              >
                <Chrome className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">Sign up with Google</span>
              </motion.button>

              {/* Divider */}
              <motion.div variants={itemVariants} className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Or continue with email</span>
                </div>
              </motion.div>

              {/* Contact Method Selector */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setContactMethod('email')}
                  className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                    contactMethod === 'email'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button
                  onClick={() => setContactMethod('phone')}
                  className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                    contactMethod === 'phone'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Phone</span>
                </button>
              </motion.div>

              {/* Input Field */}
              {contactMethod === 'email' ? (
                <motion.input
                  variants={itemVariants}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              ) : (
                <motion.input
                  variants={itemVariants}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              )}

              {/* Continue Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-card transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>

              {/* Terms */}
              <motion.p variants={itemVariants} className="text-xs text-gray-500 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <p className="text-gray-600 mb-4">
                  We've sent a verification code to <strong>{contactMethod === 'email' ? email : phone}</strong>
                </p>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-center text-2xl tracking-widest font-mono"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-card transition-all">
                  Verify
                </button>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xs text-gray-500 text-center">
                Didn't receive code?{' '}
                <a href="#" className="text-primary-600 hover:underline font-medium">
                  Resend
                </a>
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-600 mt-6"
        >
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 hover:underline font-medium">
            Sign in
          </a>
        </motion.p>
      </motion.div>
    </div>
  )
}
