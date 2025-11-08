'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, MapPin, Phone, Mail, X, Check, RotateCcw, Eye } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ShortlistedCandidate {
  id: number
  name: string
  position: string
  interviewDate: string
  interviewTime: string
  status: 'scheduled' | 'confirmed' | 'rescheduled' | 'cancelled'
  fitScore: number
  email: string
  phone: string
  location: string
}

const mockShortlisted: ShortlistedCandidate[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Full Stack Developer',
    interviewDate: '2025-11-05',
    interviewTime: '10:00 AM',
    status: 'confirmed',
    fitScore: 94,
    email: 'sarah.j@email.com',
    phone: '+1 234-567-8901',
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Senior Full Stack Developer',
    interviewDate: '2025-11-06',
    interviewTime: '2:00 PM',
    status: 'scheduled',
    fitScore: 91,
    email: 'mchen@email.com',
    phone: '+1 234-567-8902',
    location: 'San Francisco, CA'
  },
  {
    id: 3,
    name: 'Emily Davis',
    position: 'AI/ML Engineer',
    interviewDate: '2025-11-07',
    interviewTime: '11:30 AM',
    status: 'scheduled',
    fitScore: 89,
    email: 'emily.d@email.com',
    phone: '+1 234-567-8903',
    location: 'Austin, TX'
  },
]

export default function ShortlistManagement() {
  const [selectedCandidate, setSelectedCandidate] = useState<ShortlistedCandidate | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      rescheduled: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
    }
    return colors[status as keyof typeof colors]
  }

  const groupedByPosition = mockShortlisted.reduce((acc, candidate) => {
    if (!acc[candidate.position]) {
      acc[candidate.position] = []
    }
    acc[candidate.position].push(candidate)
    return acc
  }, {} as Record<string, ShortlistedCandidate[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">📋 Shortlisted Candidates</h1>
          <p className="text-gray-400">Manage interviews and schedule candidates</p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Total Shortlisted</p>
            <p className="text-4xl font-bold text-white">{mockShortlisted.length}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Confirmed</p>
            <p className="text-4xl font-bold text-green-400">
              {mockShortlisted.filter(c => c.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-blue-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Scheduled</p>
            <p className="text-4xl font-bold text-blue-400">
              {mockShortlisted.filter(c => c.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-purple-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Avg Fit Score</p>
            <p className="text-4xl font-bold text-purple-400">
              {Math.round(mockShortlisted.reduce((sum, c) => sum + c.fitScore, 0) / mockShortlisted.length)}%
            </p>
          </div>
        </motion.div>

        {/* Grouped by Position */}
        {Object.entries(groupedByPosition).map(([position, candidates], posIndex) => (
          <motion.div
            key={position}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: posIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-lime-500 rounded-full"></span>
              {position} ({candidates.length})
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {candidates.map((candidate, index) => {
                const statusColor = getStatusColor(candidate.status)
                return (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      {/* Candidate Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{candidate.name}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor.bg} ${statusColor.text} border ${statusColor.border}`}>
                              {candidate.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="w-5 h-5 text-lime-400" />
                            <span>{new Date(candidate.interviewDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <Clock className="w-5 h-5 text-lime-400" />
                            <span>{candidate.interviewTime}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <span className="text-sm">{candidate.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <Phone className="w-5 h-5 text-blue-400" />
                            <span>{candidate.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300 md:col-span-2">
                            <MapPin className="w-5 h-5 text-purple-400" />
                            <span>{candidate.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Match Score - Centered */}
                      <div className="flex flex-col items-center justify-center px-6">
                        <div className="relative w-24 h-24 mb-2">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#84cc16"
                              strokeWidth="8"
                              strokeDasharray="282.74"
                              strokeDashoffset={282.74 * (1 - candidate.fitScore / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-bold text-lime-400">{candidate.fitScore}</p>
                              <p className="text-xs text-gray-400">%</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-300">AI Match</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            setShowProfileModal(true)
                          }}
                          className="px-6 py-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(168,85,247,0.5)]"
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </motion.button>
                        {/* Show Start Interview only for virtual/phone interviews - onsite needs physical presence */}
                        {/* Note: Interview type would need to be added to ShortlistedCandidate interface */}
                        <Link href="/interview/room">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)]"
                          >
                            <Calendar className="w-4 h-4" />
                            Start Interview
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            setShowRescheduleModal(true)
                          }}
                          className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(59,130,246,0.5)]"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reschedule
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            setShowCancelModal(true)
                          }}
                          className="px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(239,68,68,0.5)]"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Profile View Modal */}
        {showProfileModal && selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl shadow-2xl max-w-4xl w-full p-8 my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">👤 Candidate Profile</h2>
                  <p className="text-gray-400">{selectedCandidate.name}</p>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Summary */}
              <div className="bg-slate-700/50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">📋 Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Position</p>
                    <p className="text-white font-medium">{selectedCandidate.position}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">AI Fit Score</p>
                    <p className="text-lime-400 font-bold text-2xl">{selectedCandidate.fitScore}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">{selectedCandidate.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">{selectedCandidate.location}</p>
                  </div>
                </div>
              </div>

              {/* Assessment Results */}
              <div className="bg-slate-700/50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">📝 Assessment Performance</h3>
                
                {/* Video Assessment */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-lime-400 mb-3">🎥 Video Assessment</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-600/50 rounded-xl p-4">
                      <p className="text-white font-medium mb-2">Q1: Tell us about yourself</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-lime-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-lime-400 font-bold">92%</span>
                      </div>
                      <p className="text-gray-400 text-sm">✓ Strong communication, clear articulation, confident delivery</p>
                    </div>
                    <div className="bg-slate-600/50 rounded-xl p-4">
                      <p className="text-white font-medium mb-2">Q2: Technical problem-solving approach</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-lime-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-lime-400 font-bold">88%</span>
                      </div>
                      <p className="text-gray-400 text-sm">✓ Methodical approach, good technical depth</p>
                    </div>
                  </div>
                </div>

                {/* Written Assessment */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">✍️ Written Assessment</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-600/50 rounded-xl p-4">
                      <p className="text-white font-medium mb-2">MCQ Questions</p>
                      <p className="text-gray-300">Score: <span className="text-green-400 font-bold">8/10</span> (80%)</p>
                      <p className="text-gray-400 text-sm mt-2">✓ Strong understanding of React hooks and async programming</p>
                    </div>
                    <div className="bg-slate-600/50 rounded-xl p-4">
                      <p className="text-white font-medium mb-2">Technical Question: async/await vs Promises</p>
                      <p className="text-gray-300 text-sm mb-2 italic">"Async/await provides syntactic sugar over Promises, making asynchronous code look synchronous and easier to read. It handles error handling through try-catch blocks..."</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="text-blue-400 font-bold">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Strengths */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">💪 Key Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full text-sm font-medium border border-lime-500/40">React.js</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/40">TypeScript</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/40">Node.js</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/40">Problem Solving</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium border border-orange-500/40">Communication</span>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-lime-500/10 to-green-600/10 border-2 border-lime-500/40 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-lime-400 mb-4">🤖 AI Insights</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 mt-1">✓</span>
                    <span>Excellent technical knowledge with {selectedCandidate.fitScore}% match to job requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 mt-1">✓</span>
                    <span>Strong communication skills demonstrated in video responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 mt-1">✓</span>
                    <span>Consistent high performance across all assessment types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 mt-1">✓</span>
                    <span>Recommended for technical interview round</span>
                  </li>
                </ul>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileModal(false)}
                  className="px-8 py-3 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-xl font-bold shadow-lg"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedCandidate && (
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
              <h2 className="text-2xl font-bold text-white mb-6">🔄 Reschedule Interview</h2>
              <p className="text-gray-400 mb-6">{selectedCandidate.name} - {selectedCandidate.position}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Time</label>
                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold shadow-lg"
                >
                  Confirm
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
        {showCancelModal && selectedCandidate && (
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
              <h2 className="text-2xl font-bold text-white mb-6">❌ Cancel Interview</h2>
              <p className="text-gray-400 mb-6">{selectedCandidate.name} - {selectedCandidate.position}</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Cancellation *</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelModal(false)}
                  disabled={!cancelReason.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Cancel
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
