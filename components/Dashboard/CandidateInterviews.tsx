'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Building2, RotateCcw, X, CheckCircle, User } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface Interview {
  id: number
  companyName: string
  position: string
  interviewDate: string
  interviewTime: string
  status: 'upcoming' | 'confirmed' | 'rescheduled' | 'cancelled'
  location: string
  interviewType: 'onsite' | 'virtual' | 'phone'
  companyLogo: string
  officeAddress?: string
  interviewerName?: string
  interviewerTitle?: string
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    companyName: 'Google',
    position: 'Senior Full Stack Developer',
    interviewDate: '2025-11-05',
    interviewTime: '10:00 AM',
    status: 'confirmed',
    location: 'Mountain View, CA',
    interviewType: 'virtual',
    companyLogo: 'G'
  },
  {
    id: 2,
    companyName: 'Meta',
    position: 'AI/ML Engineer',
    interviewDate: '2025-11-08',
    interviewTime: '2:00 PM',
    status: 'upcoming',
    location: 'Menlo Park, CA',
    interviewType: 'onsite',
    companyLogo: 'M',
    officeAddress: '1 Hacker Way, Menlo Park, CA 94025, Building 20, 3rd Floor',
    interviewerName: 'John Smith',
    interviewerTitle: 'Engineering Manager'
  },
  {
    id: 3,
    companyName: 'Amazon',
    position: 'Product Manager',
    interviewDate: '2025-11-10',
    interviewTime: '11:30 AM',
    status: 'upcoming',
    location: 'Seattle, WA',
    interviewType: 'virtual',
    companyLogo: 'A'
  },
]

export default function CandidateInterviews() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [rescheduleReason, setRescheduleReason] = useState('')
  const [cancelReason, setCancelReason] = useState('')
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/40' },
      confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40' },
      rescheduled: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' },
    }
    return colors[status as keyof typeof colors]
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual':
        return '💻'
      case 'onsite':
        return '🏢'
      case 'phone':
        return '📞'
      default:
        return '📅'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">📅 My Interviews</h1>
          <p className="text-gray-400">Manage your upcoming interview schedule</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-blue-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Upcoming</p>
            <p className="text-4xl font-bold text-blue-400">
              {mockInterviews.filter(i => i.status === 'upcoming').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Confirmed</p>
            <p className="text-4xl font-bold text-green-400">
              {mockInterviews.filter(i => i.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-purple-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Total Interviews</p>
            <p className="text-4xl font-bold text-purple-400">{mockInterviews.length}</p>
          </div>
        </motion.div>

        {/* Interview Cards */}
        <div className="space-y-6">
          {mockInterviews.map((interview, index) => {
            const statusColor = getStatusColor(interview.status)
            return (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Company Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg flex-shrink-0">
                    {interview.companyLogo}
                  </div>

                  {/* Interview Details */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{interview.companyName}</h3>
                        <p className="text-gray-400 text-sm mb-2">{interview.position}</p>
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${statusColor.bg} ${statusColor.text} border-2 ${statusColor.border}`}>
                          {interview.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="px-4 py-2 bg-slate-700/80 text-white rounded-xl text-sm font-bold">
                          {interview.interviewType.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-3 text-gray-300 bg-slate-700/50 rounded-xl p-2">
                        <Calendar className="w-5 h-5 text-lime-400" />
                        <div>
                          <p className="text-xs text-gray-400">Date</p>
                          <p className="font-medium text-sm">
                            {new Date(interview.interviewDate).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 bg-slate-700/50 rounded-xl p-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-xs text-gray-400">Time</p>
                          <p className="font-medium text-sm">{interview.interviewTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 bg-slate-700/50 rounded-xl p-2 md:col-span-2">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="font-medium text-sm">{interview.location}</p>
                        </div>
                      </div>
                      
                      {/* Show office address and interviewer for onsite */}
                      {interview.interviewType === 'onsite' && (
                        <>
                          <div className="flex items-start gap-3 text-gray-300 bg-orange-500/10 border border-orange-500/40 rounded-xl p-2 md:col-span-2">
                            <Building2 className="w-5 h-5 text-orange-400 mt-1" />
                            <div>
                              <p className="text-xs text-orange-400 font-semibold">Office Address</p>
                              <p className="font-medium text-sm">{interview.officeAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-gray-300 bg-purple-500/10 border border-purple-500/40 rounded-xl p-2 md:col-span-2">
                            <User className="w-5 h-5 text-purple-400" />
                            <div>
                              <p className="text-xs text-purple-400 font-semibold">Interviewer</p>
                              <p className="font-medium text-sm">{interview.interviewerName}</p>
                              <p className="text-xs text-gray-500">{interview.interviewerTitle}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Show Join Interview only for virtual/phone interviews */}
                      {interview.interviewType !== 'onsite' && (
                        <Link href="/interview/join">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-4 py-2 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)] text-sm"
                          >
                            <Calendar className="w-4 h-4" />
                            Join Interview
                          </motion.button>
                        </Link>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedInterview(interview)
                          setShowRescheduleModal(true)
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(59,130,246,0.5)] text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reschedule
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedInterview(interview)
                          setShowCancelModal(true)
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(239,68,68,0.5)] text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRescheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-2">🔄 Request Reschedule</h2>
              <p className="text-gray-400 mb-6">{selectedInterview.companyName} - {selectedInterview.position}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred New Time</label>
                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Rescheduling *</label>
                  <textarea
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    placeholder="Please provide a reason for rescheduling..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRescheduleModal(false)}
                  disabled={!rescheduleReason.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Submit Request
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl font-bold"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && selectedInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-red-500/40 rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-2">❌ Cancel Interview</h2>
              <p className="text-gray-400 mb-6">{selectedInterview.companyName} - {selectedInterview.position}</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Cancellation *</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason for cancelling this interview..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">⚠️ This action cannot be undone. The company will be notified.</p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelModal(false)}
                  disabled={!cancelReason.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Cancellation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl font-bold"
                >
                  Go Back
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
