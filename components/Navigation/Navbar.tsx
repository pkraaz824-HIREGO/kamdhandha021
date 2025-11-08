'use client'

import { motion } from 'framer-motion'
import { Menu, X, Bell, MessageSquare, User } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold text-gray-900 hidden md:inline">HireGo</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 font-medium hover:text-primary-600 transition-colors">
              Home
            </a>
            <a href="/jobs" className="text-gray-700 font-medium hover:text-primary-600 transition-colors">
              Jobs
            </a>
            <a href="/dashboard/candidate" className="text-gray-700 font-medium hover:text-primary-600 transition-colors">
              Dashboard
            </a>
            <a href="/" className="text-gray-700 font-medium hover:text-primary-600 transition-colors">
              About
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Icons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </motion.button>

            {/* Profile Dropdown */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4 space-y-2"
          >
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/jobs"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
            >
              Jobs
            </a>
            <a
              href="/dashboard/candidate"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
            >
              Dashboard
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
