'use client'

import { motion } from 'framer-motion'
import { Plus, Eye, Users, TrendingUp, Zap, Calendar, ClipboardList } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import JobCreationModal from './JobCreationModal'

interface JobPosting {
  id: number
  title: string
  applicants: number
  shortlisted: number
  avgFitScore: number
  postedDate: string
  isNew: boolean
}

const mockJobs: JobPosting[] = [
  { id: 1, title: 'Senior Full Stack Developer', applicants: 47, shortlisted: 8, avgFitScore: 91, postedDate: '2 days ago', isNew: true },
  { id: 2, title: 'AI/ML Engineer', applicants: 89, shortlisted: 15, avgFitScore: 87, postedDate: '1 week ago', isNew: false },
  { id: 3, title: 'Product Manager', applicants: 64, shortlisted: 12, avgFitScore: 84, postedDate: '2 weeks ago', isNew: false },
]

export default function EmployerDashboard() {
  const [showJobModal, setShowJobModal] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hiring Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and discover AI-matched candidates</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowJobModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Link href="/dashboard/shortlist">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">📋 Shortlisted Candidates</h3>
                  <p className="text-gray-800 text-sm">Manage interviews and schedules</p>
                </div>
                <ClipboardList className="w-12 h-12 text-gray-900 opacity-50" />
              </div>
            </motion.div>
          </Link>
          
          <Link href="/dashboard/calendar">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">📅 Interview Calendar</h3>
                  <p className="text-gray-100 text-sm">View day/week/month schedules</p>
                </div>
                <Calendar className="w-12 h-12 text-white opacity-50" />
              </div>
            </motion.div>
          </Link>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setShowJobModal(true)}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] p-6 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">➕ Post New Job</h3>
                <p className="text-gray-100 text-sm">Create a new job posting</p>
              </div>
              <Plus className="w-12 h-12 text-white opacity-50" />
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Users, label: 'Total Applicants', value: '200+', color: 'from-blue-500 to-cyan-500' },
            { icon: Zap, label: 'AI Matches/Week', value: '45', color: 'from-purple-500 to-pink-500' },
            { icon: TrendingUp, label: 'Avg Fit Score', value: '87%', color: 'from-green-500 to-emerald-500' },
            { icon: Calendar, label: 'Open Positions', value: '3', color: 'from-orange-500 to-red-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-card p-6 border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Job Listings */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Job Postings</h2>

          <div className="space-y-4">
            {mockJobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-card border border-gray-100 hover:border-primary-300 transition-all overflow-hidden group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        {job.isNew && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full"
                          >
                            NEW
                          </motion.span>
                        )}
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Posted {job.postedDate}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Applicants</p>
                          <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Shortlisted</p>
                          <p className="text-2xl font-bold text-primary-600">{job.shortlisted}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Avg. Fit Score</p>
                          <p className="text-2xl font-bold text-green-600">{job.avgFitScore}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full md:w-auto flex flex-col gap-3">
                      <Link href="/dashboard/shortlist">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="w-full px-6 py-3 bg-primary-50 text-primary-600 rounded-lg font-bold hover:bg-primary-100 transition-all flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Candidates</span>
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
                      >
                        Edit Job
                      </motion.button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
                    className="mt-6 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-cyan-500 origin-left rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Creation Modal */}
        <JobCreationModal isOpen={showJobModal} onClose={() => setShowJobModal(false)} />
      </div>
    </div>
  )
}
