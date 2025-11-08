'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, Users, 
  Shield, AlertTriangle, Eye, X, Phone, MessageSquare, 
  Settings, Hand, Clock, CheckCircle, Camera, CameraOff,
  Maximize, Minimize, Volume2, VolumeX, Star, ThumbsUp, ThumbsDown,
  Pause, FileText
} from 'lucide-react'

interface Participant {
  id: string
  name: string
  role: 'candidate' | 'interviewer' | 'hr' | 'observer'
  isVideoOn: boolean
  isAudioOn: boolean
  isAuthorized: boolean
  backgroundBlur?: number
  noiseReduction?: number
}

interface SecurityAlert {
  id: string
  type: 'tab-switch' | 'blur' | 'copy-paste' | 'screenshot' | 'multiple-faces' | 'no-face' | 'unauthorized-app'
  message: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high'
}

interface InterviewFeedback {
  candidateId: string
  status: 'selected' | 'rejected' | 'hold' | ''
  overallRating: number // 1-5
  technicalSkills: number // 1-5
  communication: number // 1-5
  cultureFit: number // 1-5
  remarks: string
  nextSteps: string
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'John Candidate', role: 'candidate', isVideoOn: true, isAudioOn: true, isAuthorized: true, backgroundBlur: 0, noiseReduction: 0 },
  { id: '2', name: 'Sarah (HR Manager)', role: 'hr', isVideoOn: true, isAudioOn: false, isAuthorized: true, backgroundBlur: 50, noiseReduction: 75 },
  { id: '3', name: 'Mike (Tech Lead)', role: 'interviewer', isVideoOn: true, isAudioOn: true, isAuthorized: true, backgroundBlur: 75, noiseReduction: 100 },
  { id: '4', name: 'Emma (Observer)', role: 'observer', isVideoOn: false, isAudioOn: false, isAuthorized: true, backgroundBlur: 0, noiseReduction: 0 },
]

export default function VirtualInterviewRoom() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants)
  const [currentUserRole, setCurrentUserRole] = useState<'candidate' | 'interviewer' | 'hr' | 'observer'>('interviewer') // Set based on logged-in user
  const [localVideoOn, setLocalVideoOn] = useState(true)
  const [localAudioOn, setLocalAudioOn] = useState(true)
  const [screenSharing, setScreenSharing] = useState(false)
  const [backgroundBlur, setBackgroundBlur] = useState(0) // 0, 25, 50, 75, 100
  const [noiseReduction, setNoiseReduction] = useState(0) // 0, 25, 50, 75, 100
  const [voiceClarity, setVoiceClarity] = useState(75) // Voice enhancement level
  const [showSettings, setShowSettings] = useState(false)
  const [interviewerPresence, setInterviewerPresence] = useState(100) // Percentage of time interviewer is active
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [interviewStartTime] = useState(new Date())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [isProctoring, setIsProctoring] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedback, setFeedback] = useState<InterviewFeedback>({
    candidateId: '1',
    status: '',
    overallRating: 0,
    technicalSkills: 0,
    communication: 0,
    cultureFit: 0,
    remarks: '',
    nextSteps: ''
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  // Simulate interviewer presence tracking
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate presence percentage based on active interviewers
      const activeInterviewers = participants.filter(p => 
        (p.role === 'interviewer' || p.role === 'hr') && (p.isVideoOn || p.isAudioOn)
      ).length
      const totalInterviewers = participants.filter(p => 
        p.role === 'interviewer' || p.role === 'hr'
      ).length
      const presence = totalInterviewers > 0 ? Math.round((activeInterviewers / totalInterviewers) * 100) : 0
      setInterviewerPresence(presence)
    }, 5000)
    return () => clearInterval(interval)
  }, [participants])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - interviewStartTime.getTime()) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [interviewStartTime])

  // Proctoring - Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isProctoring) {
        const newAlert: SecurityAlert = {
          id: Date.now().toString(),
          type: 'tab-switch',
          message: 'Candidate switched tabs or minimized browser',
          timestamp: new Date(),
          severity: 'high'
        }
        setSecurityAlerts(prev => [newAlert, ...prev])
        setTabSwitchCount(prev => prev + 1)
        setWarningMessage('⚠️ Tab switching detected! Stay on this page.')
        setShowWarning(true)
        setTimeout(() => setShowWarning(false), 5000)
      }
    }

    const handleBlur = () => {
      if (isProctoring) {
        const newAlert: SecurityAlert = {
          id: Date.now().toString(),
          type: 'blur',
          message: 'Window lost focus',
          timestamp: new Date(),
          severity: 'medium'
        }
        setSecurityAlerts(prev => [newAlert, ...prev])
      }
    }

    // Block copy-paste
    const handleCopyPaste = (e: ClipboardEvent) => {
      if (isProctoring) {
        e.preventDefault()
        const newAlert: SecurityAlert = {
          id: Date.now().toString(),
          type: 'copy-paste',
          message: 'Copy/Paste attempt blocked',
          timestamp: new Date(),
          severity: 'medium'
        }
        setSecurityAlerts(prev => [newAlert, ...prev])
        setWarningMessage('⚠️ Copy/Paste is disabled during interview!')
        setShowWarning(true)
        setTimeout(() => setShowWarning(false), 3000)
      }
    }

    // Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      if (isProctoring) {
        e.preventDefault()
      }
    }

    // Detect keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isProctoring) {
        // Block Alt+Tab, Ctrl+W, Ctrl+T, etc.
        if (
          (e.altKey && e.key === 'Tab') ||
          (e.ctrlKey && (e.key === 'w' || e.key === 't' || e.key === 'n')) ||
          e.key === 'F11' // Block manual fullscreen toggle
        ) {
          e.preventDefault()
          setWarningMessage('⚠️ Keyboard shortcut blocked!')
          setShowWarning(true)
          setTimeout(() => setShowWarning(false), 3000)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('copy', handleCopyPaste)
    document.addEventListener('paste', handleCopyPaste)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('copy', handleCopyPaste)
      document.removeEventListener('paste', handleCopyPaste)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProctoring])

  // Enter fullscreen mode
  useEffect(() => {
    if (isProctoring) {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {
          setWarningMessage('Please enable fullscreen mode for the interview')
          setShowWarning(true)
        })
        setIsFullscreen(true)
      }
    }
  }, [isProctoring])

  const handleParticipantSettingsUpdate = (participantId: string, setting: 'backgroundBlur' | 'noiseReduction', value: number) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, [setting]: value } : p
    ))
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      candidate: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      interviewer: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      hr: 'bg-green-500/20 text-green-400 border-green-500/40',
      observer: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
    }
    return colors[role as keyof typeof colors]
  }

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      medium: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      high: 'bg-red-500/20 text-red-400 border-red-500/40',
    }
    return colors[severity as keyof typeof colors]
  }

  const handleEndInterview = () => {
    // Only show feedback modal for employers/interviewers/HR
    if (currentUserRole === 'interviewer' || currentUserRole === 'hr') {
      setShowFeedbackModal(true)
    } else {
      // Candidates can leave without feedback
      if (confirm('Are you sure you want to leave the interview?')) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
        setIsProctoring(false)
      }
    }
  }

  const handleSubmitFeedback = () => {
    // Validate required fields
    if (!feedback.status) {
      setWarningMessage('⚠️ Please select a status (Selected/Rejected/Hold)')
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }
    if (!feedback.remarks.trim()) {
      setWarningMessage('⚠️ Remarks/Feedback is mandatory')
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }
    if (feedback.overallRating === 0) {
      setWarningMessage('⚠️ Please provide an overall rating')
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }

    // All validations passed, end interview
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setIsProctoring(false)
    setShowFeedbackModal(false)
    // Navigate to summary or dashboard
    alert('Interview ended successfully! Feedback submitted.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Warning Banner */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-red-500 text-white py-4 px-6 z-[100] flex items-center justify-center gap-3 shadow-2xl"
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold text-lg">{warningMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Control Bar */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-bold">LIVE INTERVIEW</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-bold">Proctored</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowParticipants(!showParticipants)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              showParticipants 
                ? 'bg-lime-500 text-gray-900' 
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{participants.length}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEndInterview}
            className="px-6 py-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4" />
            {currentUserRole === 'candidate' ? 'Leave Interview' : 'End Interview'}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Main Speaker (Candidate) */}
            <div className="col-span-2 bg-slate-800 rounded-2xl overflow-hidden relative border-2 border-slate-600">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
                style={{ 
                  transform: 'scaleX(-1)',
                  filter: backgroundBlur > 0 ? `blur(${backgroundBlur / 10}px)` : 'none'
                }}
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  JC
                </div>
                <div>
                  <p className="text-white font-bold">John Candidate</p>
                  <span className="text-xs text-blue-400 font-medium">Candidate</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                <div className="bg-red-500/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2">
                  <Eye className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold">AI Monitoring</span>
                </div>
                {backgroundBlur > 0 && (
                  <div className="bg-blue-500/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2">
                    <Camera className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">Blur: {backgroundBlur}%</span>
                  </div>
                )}
                {noiseReduction > 0 && (
                  <div className="bg-purple-500/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2">
                    <Mic className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">Noise: -{noiseReduction}%</span>
                  </div>
                )}
                {voiceClarity > 50 && (
                  <div className="bg-green-500/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">Voice: +{voiceClarity}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interviewer Videos */}
            {participants.filter(p => p.role !== 'candidate').slice(0, 3).map((participant) => (
              <div
                key={participant.id}
                className="bg-slate-800 rounded-xl overflow-hidden relative border border-slate-600 group"
              >
                <div 
                  className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center"
                  style={{
                    filter: participant.backgroundBlur ? `blur(${participant.backgroundBlur / 10}px)` : 'none',
                    transition: 'filter 0.3s ease'
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg">
                  <p className="text-white text-sm font-bold">{participant.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleBadgeColor(participant.role)}`}>
                    {participant.role.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  {participant.isVideoOn ? (
                    <Video className="w-4 h-4 text-green-400" />
                  ) : (
                    <VideoOff className="w-4 h-4 text-red-400" />
                  )}
                  {participant.isAudioOn ? (
                    <Mic className="w-4 h-4 text-green-400" />
                  ) : (
                    <MicOff className="w-4 h-4 text-red-400" />
                  )}
                </div>
                {/* Audio/Video Enhancement Indicators */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {(participant.backgroundBlur ?? 0) > 0 && (
                    <div className="bg-blue-500/90 backdrop-blur-md px-2 py-0.5 rounded text-xs text-white font-bold">
                      Blur: {participant.backgroundBlur}%
                    </div>
                  )}
                  {(participant.noiseReduction ?? 0) > 0 && (
                    <div className="bg-purple-500/90 backdrop-blur-md px-2 py-0.5 rounded text-xs text-white font-bold">
                      Noise: -{participant.noiseReduction}%
                    </div>
                  )}
                </div>
                {/* Settings Button (appears on hover) */}
                <button
                  onClick={() => setSelectedParticipant(participant.id)}
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700/90 backdrop-blur-md p-2 rounded-lg hover:bg-slate-600"
                >
                  <Settings className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Control Bar */}
          <div className="mt-4 bg-slate-800 rounded-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocalAudioOn(!localAudioOn)}
                className={`p-4 rounded-xl font-bold transition-all ${
                  localAudioOn
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-red-500 text-white'
                }`}
              >
                {localAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocalVideoOn(!localVideoOn)}
                className={`p-4 rounded-xl font-bold transition-all ${
                  localVideoOn
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-red-500 text-white'
                }`}
              >
                {localVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreenSharing(!screenSharing)}
                className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  screenSharing
                    ? 'bg-lime-500 text-gray-900'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {screenSharing ? <Monitor className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
                <span>Share Screen</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-slate-700 rounded-xl text-white hover:bg-slate-600"
              >
                <Hand className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(!showChat)}
                className="p-4 bg-slate-700 rounded-xl text-white hover:bg-slate-600 relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className={`p-4 rounded-xl font-bold transition-all ${
                  showSettings
                    ? 'bg-lime-500 text-gray-900'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-600 rounded-3xl p-6 shadow-2xl z-50 w-96"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Audio & Video Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Background Blur */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-400" />
                    Background Blur
                  </label>
                  <span className="text-lime-400 font-bold">{backgroundBlur}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={backgroundBlur}
                  onChange={(e) => setBackgroundBlur(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #84cc16 0%, #84cc16 ${backgroundBlur}%, #334155 ${backgroundBlur}%, #334155 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Off</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Max</span>
                </div>
              </div>

              {/* Noise Reduction */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-400" />
                    Noise Reduction
                  </label>
                  <span className="text-lime-400 font-bold">{noiseReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={noiseReduction}
                  onChange={(e) => setNoiseReduction(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${noiseReduction}%, #334155 ${noiseReduction}%, #334155 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Off</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Max</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Removes background noise and improves audio quality</p>
              </div>

              {/* Voice Clarity Enhancement */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-green-400" />
                    Voice Clarity
                  </label>
                  <span className="text-lime-400 font-bold">{voiceClarity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={voiceClarity}
                  onChange={(e) => setVoiceClarity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #22c55e 0%, #22c55e ${voiceClarity}%, #334155 ${voiceClarity}%, #334155 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Off</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Max</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Enhances voice frequencies for crystal-clear speech</p>
              </div>

              {/* Status Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3">
                  <span className="text-gray-300 text-sm">Background Processing</span>
                  <span className={`text-sm font-bold ${
                    backgroundBlur > 0 ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {backgroundBlur > 0 ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3">
                  <span className="text-gray-300 text-sm">Noise Suppression</span>
                  <span className={`text-sm font-bold ${
                    noiseReduction > 0 ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {noiseReduction > 0 ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3">
                  <span className="text-gray-300 text-sm">Voice Enhancement</span>
                  <span className={`text-sm font-bold ${
                    voiceClarity > 50 ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {voiceClarity > 50 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Participant Settings Modal */}
        <AnimatePresence>
          {selectedParticipant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedParticipant(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-800 border border-slate-600 rounded-3xl p-6 shadow-2xl w-96"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">
                    {participants.find(p => p.id === selectedParticipant)?.name} - Settings
                  </h3>
                  <button onClick={() => setSelectedParticipant(null)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {(() => {
                  const participant = participants.find(p => p.id === selectedParticipant)
                  if (!participant) return null

                  return (
                    <>
                      {/* Background Blur */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-white font-medium flex items-center gap-2">
                            <Camera className="w-4 h-4 text-blue-400" />
                            Background Blur
                          </label>
                          <span className="text-lime-400 font-bold">{participant.backgroundBlur ?? 0}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="25"
                          value={participant.backgroundBlur ?? 0}
                          onChange={(e) => handleParticipantSettingsUpdate(participant.id, 'backgroundBlur', Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #84cc16 0%, #84cc16 ${participant.backgroundBlur ?? 0}%, #334155 ${participant.backgroundBlur ?? 0}%, #334155 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Off</span>
                          <span>Max</span>
                        </div>
                      </div>

                      {/* Noise Reduction */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-white font-medium flex items-center gap-2">
                            <Mic className="w-4 h-4 text-purple-400" />
                            Noise Reduction
                          </label>
                          <span className="text-lime-400 font-bold">{participant.noiseReduction ?? 0}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="25"
                          value={participant.noiseReduction ?? 0}
                          onChange={(e) => handleParticipantSettingsUpdate(participant.id, 'noiseReduction', Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${participant.noiseReduction ?? 0}%, #334155 ${participant.noiseReduction ?? 0}%, #334155 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Off</span>
                          <span>Max</span>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedParticipant(null)}
                        className="w-full px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold shadow-lg"
                      >
                        Apply Settings
                      </motion.button>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interview Feedback Modal - Only for Employers/Interviewers/HR */}
        <AnimatePresence>
          {showFeedbackModal && (currentUserRole === 'interviewer' || currentUserRole === 'hr') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-slate-800 to-gray-900 border-2 border-lime-500/40 rounded-3xl p-8 shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">📝 Interview Feedback</h2>
                    <p className="text-gray-400">Complete evaluation for: <span className="text-lime-400 font-bold">{participants.find(p => p.role === 'candidate')?.name}</span></p>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/40 rounded-xl px-4 py-2">
                    <p className="text-purple-400 text-sm font-bold">EMPLOYER ONLY</p>
                  </div>
                </div>

                {/* Status Selection - Required */}
                <div className="mb-6">
                  <label className="block text-white font-bold text-lg mb-3">
                    Status <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedback({ ...feedback, status: 'selected' })}
                      className={`p-4 rounded-2xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${
                        feedback.status === 'selected'
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-slate-700/50 border-slate-600 text-gray-400 hover:border-green-500/50'
                      }`}
                    >
                      <ThumbsUp className="w-8 h-8" />
                      <span>Selected</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedback({ ...feedback, status: 'hold' })}
                      className={`p-4 rounded-2xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${
                        feedback.status === 'hold'
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-slate-700/50 border-slate-600 text-gray-400 hover:border-yellow-500/50'
                      }`}
                    >
                      <Pause className="w-8 h-8" />
                      <span>On Hold</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedback({ ...feedback, status: 'rejected' })}
                      className={`p-4 rounded-2xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${
                        feedback.status === 'rejected'
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-slate-700/50 border-slate-600 text-gray-400 hover:border-red-500/50'
                      }`}
                    >
                      <ThumbsDown className="w-8 h-8" />
                      <span>Rejected</span>
                    </motion.button>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="mb-6">
                  <label className="block text-white font-bold text-lg mb-4">
                    Overall Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFeedback({ ...feedback, overallRating: rating })}
                        className="p-2"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            rating <= feedback.overallRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Technical Skills</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFeedback({ ...feedback, technicalSkills: rating })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= feedback.technicalSkills
                                ? 'fill-blue-400 text-blue-400'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Communication</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFeedback({ ...feedback, communication: rating })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= feedback.communication
                                ? 'fill-purple-400 text-purple-400'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Culture Fit</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFeedback({ ...feedback, cultureFit: rating })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= feedback.cultureFit
                                ? 'fill-green-400 text-green-400'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Remarks - Required */}
                <div className="mb-6">
                  <label className="block text-white font-bold text-lg mb-3">
                    Remarks / Feedback <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={feedback.remarks}
                    onChange={(e) => setFeedback({ ...feedback, remarks: e.target.value })}
                    placeholder="Provide detailed feedback about the candidate's performance, strengths, and areas of improvement..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none resize-none"
                  />
                  <p className="text-sm text-gray-400 mt-2">Minimum 20 characters required</p>
                </div>

                {/* Next Steps */}
                <div className="mb-6">
                  <label className="block text-white font-bold text-lg mb-3">
                    Next Steps / Action Items
                  </label>
                  <textarea
                    value={feedback.nextSteps}
                    onChange={(e) => setFeedback({ ...feedback, nextSteps: e.target.value })}
                    placeholder="What are the next steps? (e.g., Schedule second round, Send offer, No further action, etc.)"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Required Fields Notice */}
                <div className="bg-orange-500/10 border-2 border-orange-500/40 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-orange-400 font-bold mb-1">Required Fields (Employer Only)</p>
                      <ul className="text-orange-300 text-sm space-y-1">
                        <li>✓ Status (Selected/Hold/Rejected)</li>
                        <li>✓ Overall Rating (1-5 stars)</li>
                        <li>✓ Remarks/Feedback (minimum 20 characters)</li>
                      </ul>
                      <p className="text-orange-400 text-xs mt-2">⚠️ This feedback will NOT be shared with the candidate</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitFeedback}
                    className="flex-1 px-8 py-4 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Submit & End Interview
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-8 py-4 bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-600 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Sidebar - Security Monitoring */}
        {showParticipants && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-96 bg-slate-900/95 backdrop-blur-md border-l border-slate-700 p-4 overflow-y-auto"
          >
            {/* Security Status */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-lime-400" />
                Security Monitor
              </h3>

              <div className="space-y-3">
                {/* Interviewer Presence */}
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Interviewer Presence</span>
                    <span className={`text-lg font-bold ${
                      interviewerPresence >= 80 ? 'text-green-400' : 
                      interviewerPresence >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {interviewerPresence}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        interviewerPresence >= 80 ? 'bg-green-500' :
                        interviewerPresence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${interviewerPresence}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {participants.filter(p => (p.role === 'interviewer' || p.role === 'hr') && (p.isVideoOn || p.isAudioOn)).length} of {participants.filter(p => p.role === 'interviewer' || p.role === 'hr').length} active
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Tab Switches</span>
                    <span className={`text-lg font-bold ${tabSwitchCount > 3 ? 'text-red-400' : 'text-green-400'}`}>
                      {tabSwitchCount}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${tabSwitchCount > 3 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(tabSwitchCount * 20, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Face Detection</span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Screen Recording</span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Recording
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Security Alerts ({securityAlerts.length})
              </h3>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {securityAlerts.length === 0 ? (
                  <div className="bg-green-500/10 border border-green-500/40 rounded-xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 text-sm">No violations detected</p>
                  </div>
                ) : (
                  securityAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-xl p-3 border ${getSeverityColor(alert.severity)}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-bold uppercase">{alert.type.replace('-', ' ')}</span>
                        <span className="text-xs opacity-70">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Participants List */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Participants ({participants.length})
              </h3>

              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="bg-slate-800 rounded-xl p-3 border border-slate-600 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">{participant.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleBadgeColor(participant.role)}`}>
                          {participant.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {participant.isVideoOn ? (
                        <Video className="w-4 h-4 text-green-400" />
                      ) : (
                        <VideoOff className="w-4 h-4 text-gray-500" />
                      )}
                      {participant.isAudioOn ? (
                        <Mic className="w-4 h-4 text-green-400" />
                      ) : (
                        <MicOff className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
