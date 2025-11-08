'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Shield, Video, Users, Clock, CheckCircle, AlertTriangle, Camera, Mic, Monitor, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface InterviewDetails {
  companyName: string
  position: string
  interviewDate: string
  interviewTime: string
  duration: string
  interviewers: string[]
}

const mockInterview: InterviewDetails = {
  companyName: 'Tech Corp',
  position: 'Senior Full Stack Developer',
  interviewDate: '2025-11-05',
  interviewTime: '10:00 AM',
  duration: '60 minutes',
  interviewers: ['Sarah (HR Manager)', 'Mike (Tech Lead)', 'Emma (Observer)']
}

export default function InterviewJoin() {
  const router = useRouter()
  const [cameraGranted, setCameraGranted] = useState(false)
  const [micGranted, setMicGranted] = useState(false)
  const [screenGranted, setScreenGranted] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [allChecksComplete, setAllChecksComplete] = useState(false)

  const handlePermissionCheck = async () => {
    setIsChecking(true)
    
    // Request camera permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setCameraGranted(true)
      setMicGranted(true)
      stream.getTracks().forEach(track => track.stop())
    } catch (err) {
      console.error('Permission denied', err)
    }

    // Check screen share capability
    setScreenGranted(true)
    
    setTimeout(() => {
      setIsChecking(false)
      setAllChecksComplete(true)
    }, 1500)
  }

  const canJoin = cameraGranted && micGranted && agreedToTerms && allChecksComplete

  const handleJoinInterview = () => {
    if (canJoin) {
      router.push('/interview/room')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-20 h-20 bg-gradient-to-br from-lime-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
          >
            <Video className="w-10 h-10 text-gray-900" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Ready to Join Interview?</h1>
          <p className="text-gray-400">Please complete the setup before joining</p>
        </div>

        {/* Interview Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 mb-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📋 Interview Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Company</p>
              <p className="text-white font-bold text-lg">{mockInterview.companyName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Position</p>
              <p className="text-white font-bold">{mockInterview.position}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date & Time</p>
              <p className="text-white font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400" />
                {new Date(mockInterview.interviewDate).toLocaleDateString()} at {mockInterview.interviewTime}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Duration</p>
              <p className="text-white font-bold">{mockInterview.duration}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-2">Interviewers</p>
              <div className="flex flex-wrap gap-2">
                {mockInterview.interviewers.map((interviewer, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/40">
                    {interviewer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Check */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 mb-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-lime-400" />
            Pre-Interview System Check
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Camera Access</span>
              </div>
              {cameraGranted ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
              )}
            </div>

            <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Microphone Access</span>
              </div>
              {micGranted ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
              )}
            </div>

            <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Screen Sharing Ready</span>
              </div>
              {screenGranted ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
              )}
            </div>
          </div>

          {!allChecksComplete && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePermissionCheck}
              disabled={isChecking}
              className="w-full px-6 py-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isChecking ? 'Checking...' : 'Run System Check'}
            </motion.button>
          )}
        </motion.div>

        {/* Proctoring Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/40 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Proctored Interview - Important Notice
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Full Screen Required</p>
                <p className="text-sm">Interview will run in fullscreen mode. Exiting will trigger an alert.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Activity Monitoring</p>
                <p className="text-sm">Tab switching, window changes, and screen activity will be tracked.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Video & Audio Recording</p>
                <p className="text-sm">Your camera and screen will be recorded throughout the interview.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Restricted Actions</p>
                <p className="text-sm">Copy/paste, right-click, and keyboard shortcuts are disabled.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-orange-500 bg-slate-700 cursor-pointer"
            />
            <label htmlFor="terms" className="text-white text-sm cursor-pointer">
              I understand and agree to the proctoring terms. I consent to video/audio recording and activity monitoring during this interview.
            </label>
          </div>
        </motion.div>

        {/* Join Button */}
        <motion.button
          whileHover={canJoin ? { scale: 1.02 } : {}}
          whileTap={canJoin ? { scale: 0.98 } : {}}
          onClick={handleJoinInterview}
          disabled={!canJoin}
          className={`w-full px-8 py-5 rounded-2xl font-extrabold text-xl flex items-center justify-center gap-3 shadow-2xl transition-all ${
            canJoin
              ? 'bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 hover:shadow-[0_20px_40px_rgba(132,204,22,0.5)]'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Video className="w-6 h-6" />
          {canJoin ? 'Join Interview Now' : 'Complete Setup to Join'}
        </motion.button>

        {!canJoin && (
          <p className="text-center text-gray-400 text-sm mt-4">
            {!allChecksComplete && '⚠️ Please run system check'}
            {allChecksComplete && !agreedToTerms && '⚠️ Please agree to proctoring terms'}
          </p>
        )}
      </motion.div>
    </div>
  )
}
