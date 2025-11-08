'use client'

import { motion } from 'framer-motion'
import { Briefcase, Star, CheckCircle, Clock, ArrowRight, Calendar, Video } from 'lucide-react'
import Link from 'next/link'

interface CandidateCard {
  id: number
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered'
  company: string
  position: string
  appliedDate: string
  matchScore: number
}

const mockApplications: CandidateCard[] = [
  { id: 1, status: 'offered', company: 'Google', position: 'Senior Full Stack Developer', appliedDate: '2 days ago', matchScore: 96 },
  { id: 2, status: 'interviewing', company: 'Meta', position: 'AI/ML Engineer', appliedDate: '5 days ago', matchScore: 89 },
  { id: 3, status: 'shortlisted', company: 'Amazon', position: 'Product Manager', appliedDate: '1 week ago', matchScore: 85 },
  { id: 4, status: 'applied', company: 'Netflix', position: 'Backend Engineer', appliedDate: '1 week ago', matchScore: 78 },
]

export default function CandidateDashboard() {
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

  const getStatusColor = (status: string) => {
    const colors = {
      applied: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-500' },
      shortlisted: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-500' },
      interviewing: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-500' },
      offered: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-500' },
    }
    return colors[status as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Alex</h1>
          <p className="text-gray-600">Track your applications and AI-matched opportunities</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link href="/dashboard/interviews">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">📅 My Interviews</h3>
                  <p className="text-gray-800 text-sm">View and manage your scheduled interviews</p>
                </div>
                <Calendar className="w-12 h-12 text-gray-900 opacity-50" />
              </div>
            </motion.div>
          </Link>
          
          <Link href="/registration/candidate">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🎥 Update Profile</h3>
                  <p className="text-gray-100 text-sm">Complete your AI assessment</p>
                </div>
                <Video className="w-12 h-12 text-white opacity-50" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Profile Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* AI Fit Score */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray="339.29"
                      initial={{ strokeDashoffset: 339.29 }}
                      animate={{ strokeDashoffset: 339.29 * 0.22 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-600">87</p>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">AI Fit Score</p>
                  <p className="text-sm text-gray-600">Excellent match for roles</p>
                </div>
              </motion.div>

              {/* Profile Completion */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray="339.29"
                      initial={{ strokeDashoffset: 339.29 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, delay: 0.8 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">100</p>
                      <p className="text-xs text-gray-500">%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Profile Complete</p>
                  <p className="text-sm text-gray-600">Video resume uploaded</p>
                </div>
              </motion.div>

              {/* Stats */}
              {[
                { label: 'Applications', value: '12', icon: Briefcase },
                { label: 'Shortlisted', value: '4', icon: Star },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Application Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Applications</h2>

          {mockApplications.map((app, index) => {
            const statusColor = getStatusColor(app.status)
            return (
              <motion.div
                key={app.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-card border border-gray-100 hover:border-primary-200 transition-all overflow-hidden group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-lg ${statusColor.bg} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xl font-bold text-gray-800">
                            {app.company.charAt(0)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{app.position}</h3>
                          <p className="text-gray-600 font-medium mb-2">{app.company}</p>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text} border ${statusColor.border}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">{app.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-auto flex flex-col md:flex-col-reverse items-start md:items-end gap-4">
                      {/* AI Match Score */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary-600">{app.matchScore}%</p>
                          <p className="text-xs text-gray-600">AI Match</p>
                        </div>
                        <div className="relative w-16 h-16">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="26" fill="none" stroke="#f0f0f0" strokeWidth="4" />
                            <motion.circle
                              cx="30"
                              cy="30"
                              r="26"
                              fill="none"
                              stroke="#0ea5e9"
                              strokeWidth="4"
                              strokeDasharray="163.36"
                              initial={{ strokeDashoffset: 163.36 }}
                              animate={{ strokeDashoffset: 163.36 * (1 - app.matchScore / 100) }}
                              transition={{ duration: 1.5, delay: index * 0.1 + 0.3 }}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link href="/dashboard/interviews">
                        <motion.button
                          whileHover={{ gap: '12px' }}
                          className="px-6 py-2 rounded-lg bg-primary-50 text-primary-600 font-medium hover:bg-primary-100 transition-all flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 origin-left"
                  style={{ opacity: 0.5 }}
                ></motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
