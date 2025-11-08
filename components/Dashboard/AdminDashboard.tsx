'use client'

import { motion } from 'framer-motion'
import { BarChart3, Users, DollarSign, Settings, Zap } from 'lucide-react'
import { useState } from 'react'

interface AdminStat {
  label: string
  value: string
  icon: any
  color: string
  change: string
}

const adminStats: AdminStat[] = [
  { label: 'Total Users', value: '2,543', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12% from last week' },
  { label: 'Total Revenue', value: '$45,200', icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+23% from last month' },
  { label: 'Active Jobs', value: '342', icon: BarChart3, color: 'from-purple-500 to-pink-500', change: '+8 new today' },
]

export default function AdminDashboard() {
  const [businessModel, setBusinessModel] = useState<'pay-per-hire' | 'subscription'>('subscription')
  const [showModelWarning, setShowModelWarning] = useState(false)

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

  const handleModelChange = () => {
    setShowModelWarning(true)
  }

  const confirmModelChange = () => {
    setBusinessModel(businessModel === 'subscription' ? 'pay-per-hire' : 'subscription')
    setShowModelWarning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Control Panel</h1>
          <p className="text-gray-600">System overview and platform configuration</p>
        </motion.div>

        {/* Business Model Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-card p-8 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Model</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Current Model: <span className="font-bold text-primary-600 capitalize">{businessModel.replace('-', ' ')}</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {businessModel === 'subscription'
                  ? 'Employers pay monthly/yearly for unlimited job posts'
                  : 'Employers pay per successful candidate hire'}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleModelChange}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>Switch Model</span>
            </motion.button>
          </div>

          {/* Model Details */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className={`p-4 rounded-lg border-2 transition-all ${
              businessModel === 'subscription'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className="font-bold text-gray-900 mb-2">Subscription Model</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Predictable monthly revenue</li>
                <li>✓ Unlimited job postings</li>
                <li>✓ Priority support</li>
                <li>✓ Analytics dashboard</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              businessModel === 'pay-per-hire'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className="font-bold text-gray-900 mb-2">Pay-Per-Hire Model</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ No upfront cost</li>
                <li>✓ Pay only on hire</li>
                <li>✓ Flexible usage</li>
                <li>✓ Per-candidate invoicing</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {adminStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-card p-8 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Hiring Activity */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-card p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Hiring Activity (Last 7 Days)</h3>
            <div className="space-y-4">
              {[
                { label: 'Successful Hires', value: 156, color: 'bg-green-500' },
                { label: 'Shortlisted Candidates', value: 523, color: 'bg-blue-500' },
                { label: 'New Applications', value: 1247, color: 'bg-purple-500' },
                { label: 'Completed Interviews', value: 89, color: 'bg-orange-500' },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{metric.label}</span>
                    <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    className={`h-3 ${metric.color} rounded-full origin-left opacity-70`}
                  ></motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Growth */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-card p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">User Growth</h3>
            <div className="space-y-6">
              {[
                { category: 'Candidates', users: 1523, new: '+145 this week', color: 'from-cyan-500 to-blue-500' },
                { category: 'Employers', users: 487, new: '+32 this week', color: 'from-purple-500 to-pink-500' },
                { category: 'Premium Accounts', users: 203, new: '+18 this week', color: 'from-orange-500 to-red-500' },
              ].map((group, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">{group.category}</p>
                      <p className="text-xs text-gray-600">{group.new}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{group.users}</p>
                  </div>
                  <div className={`h-3 bg-gradient-to-r ${group.color} rounded-full opacity-70`}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Model Change Warning Modal */}
        {showModelWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModelWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Model Change</h3>
              <p className="text-gray-600 mb-6">
                Switching to <span className="font-bold capitalize">{businessModel === 'subscription' ? 'Pay-Per-Hire' : 'Subscription'}</span> model will:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6 bg-gray-50 p-4 rounded-lg">
                <li>• Update all employer dashboards immediately</li>
                <li>• Reset current billing cycles</li>
                <li>• Notify all active employers of the change</li>
                <li>• This action cannot be undone without manual database changes</li>
              </ul>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={confirmModelChange}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Confirm Change
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowModelWarning(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
