'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 flex items-center justify-center font-bold">
                H
              </div>
              <span className="text-xl font-bold">HireGo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Next-generation professional networking platform powered by AI for instant hiring.
            </p>
            <div className="flex gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold text-lg">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Features', 'Pricing', 'Security', 'Blog', 'Updates'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold text-lg">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['About Us', 'Careers', 'Press', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold text-lg">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 border border-primary-500/20 rounded-xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest on AI hiring, new features, and industry insights.</p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm"
        >
          <p>&copy; {currentYear} HireGo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Changelog
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Feedback
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
