'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, Check, X, Users } from 'lucide-react'
import { useState } from 'react'

type ViewType = 'day' | 'week' | 'month'

interface TimeSlot {
  id: number
  time: string
  available: boolean
  candidate?: string
  position?: string
  status?: 'scheduled' | 'pending' | 'confirmed'
}

interface Interview {
  id: number
  candidateName: string
  position: string
  date: string
  time: string
  status: 'scheduled' | 'pending' | 'confirmed'
}

const mockTimeSlots: TimeSlot[] = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: false, candidate: 'Sarah Johnson', position: 'Senior Developer', status: 'confirmed' },
  { id: 3, time: '11:00 AM', available: true },
  { id: 4, time: '12:00 PM', available: true },
  { id: 5, time: '01:00 PM', available: true },
  { id: 6, time: '02:00 PM', available: false, candidate: 'Michael Chen', position: 'AI/ML Engineer', status: 'pending' },
  { id: 7, time: '03:00 PM', available: true },
  { id: 8, time: '04:00 PM', available: false, candidate: 'Emily Davis', position: 'Product Manager', status: 'scheduled' },
  { id: 9, time: '05:00 PM', available: true },
]

const mockInterviews: Interview[] = [
  { id: 1, candidateName: 'Sarah Johnson', position: 'Senior Developer', date: '2025-11-05', time: '10:00 AM', status: 'confirmed' },
  { id: 2, candidateName: 'Michael Chen', position: 'AI/ML Engineer', date: '2025-11-06', time: '02:00 PM', status: 'pending' },
  { id: 3, candidateName: 'Emily Davis', position: 'Product Manager', date: '2025-11-07', time: '04:00 PM', status: 'scheduled' },
]

export default function InterviewCalendar() {
  const [viewType, setViewType] = useState<ViewType>('week')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showSlotModal, setShowSlotModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [customDate, setCustomDate] = useState('')
  const [customTime, setCustomTime] = useState('')

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/40' },
      pending: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40' },
      confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40' },
    }
    return colors[status as keyof typeof colors]
  }

  const getDayStats = () => {
    return {
      total: mockInterviews.filter(i => i.date === selectedDate.toISOString().split('T')[0]).length,
      confirmed: mockInterviews.filter(i => i.status === 'confirmed').length,
      pending: mockInterviews.filter(i => i.status === 'pending').length,
    }
  }

  const getWeekStats = () => {
    return {
      total: mockInterviews.length,
      confirmed: mockInterviews.filter(i => i.status === 'confirmed').length,
      pending: mockInterviews.filter(i => i.status === 'pending').length,
    }
  }

  const stats = viewType === 'day' ? getDayStats() : getWeekStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">📅 Interview Calendar</h1>
          <p className="text-gray-400">Manage interview schedules and slot availability</p>
        </motion.div>

        {/* View Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 items-center justify-between mb-8"
        >
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as ViewType[]).map((view) => (
              <motion.button
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewType(view)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  viewType === view
                    ? 'bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 shadow-[0_8px_16px_rgba(132,204,22,0.5)]'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </motion.button>
            ))}
          </div>

          {/* Date Navigation */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            <span className="text-white font-bold text-lg min-w-[200px] text-center">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-blue-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Total Interviews</p>
            <p className="text-4xl font-bold text-blue-400">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Confirmed</p>
            <p className="text-4xl font-bold text-green-400">{stats.confirmed}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-orange-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <p className="text-gray-400 text-sm mb-2">Pending</p>
            <p className="text-4xl font-bold text-orange-400">{stats.pending}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Time Slots Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">⏰ Available Time Slots</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSlotModal(true)}
                  className="px-4 py-2 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Slot
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockTimeSlots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl p-4 border-2 transition-all ${
                      slot.available
                        ? 'bg-green-500/10 border-green-500/40 hover:border-green-500/60'
                        : 'bg-slate-700/50 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Clock className={`w-5 h-5 ${slot.available ? 'text-green-400' : 'text-gray-400'}`} />
                        <span className="text-white font-bold">{slot.time}</span>
                      </div>
                      {slot.available ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/40">
                          Available
                        </span>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(slot.status!).bg} ${getStatusColor(slot.status!).text} ${getStatusColor(slot.status!).border}`}>
                          {slot.status?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {!slot.available && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <p className="text-gray-300 text-sm font-medium">{slot.candidate}</p>
                        <p className="text-gray-500 text-xs">{slot.position}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Upcoming Interviews Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <h2 className="text-2xl font-bold text-white mb-6">📋 Upcoming</h2>
              <div className="space-y-4">
                {mockInterviews.map((interview, index) => {
                  const statusColor = getStatusColor(interview.status)
                  return (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-700/50 rounded-2xl p-4 border border-slate-600 hover:border-lime-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-white font-bold mb-1">{interview.candidateName}</h3>
                          <p className="text-gray-400 text-sm mb-2">{interview.position}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${statusColor.bg} ${statusColor.text}`}>
                          {interview.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 text-lime-400" />
                        <span>{new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <Clock className="w-4 h-4 text-blue-400 ml-2" />
                        <span>{interview.time}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add Slot Modal */}
        {showSlotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSlotModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">➕ Add Available Slot</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSlotModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold shadow-lg"
                >
                  <Check className="w-4 h-4 inline mr-2" />
                  Add Slot
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSlotModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl font-bold"
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
