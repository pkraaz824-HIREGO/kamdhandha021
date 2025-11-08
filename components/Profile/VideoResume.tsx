'use client'

import { motion } from 'framer-motion'
import { Video, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function VideoResume() {
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Video Resume</h1>
          <p className="text-gray-600">Stand out with a personal video introduction (30-90 seconds)</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
        >
          {/* Video Preview Area */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-video flex items-center justify-center relative overflow-hidden"
          >
            {!videoUploaded ? (
              <div className="text-center z-10 relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Video className="w-16 h-16 text-white mx-auto opacity-60" />
                </motion.div>
                <p className="text-white text-lg font-medium">Video preview will appear here</p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-white font-bold">Video uploaded successfully!</p>
                </div>
              </div>
            )}

            {/* Animated Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-30"
            ></motion.div>
          </motion.div>

          {/* Controls */}
          <motion.div variants={itemVariants} className="p-8 space-y-6">
            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 mb-1">Quick Tips:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Speak clearly about your background and skills</li>
                  <li>• Keep it natural and friendly (30-90 seconds)</li>
                  <li>• Good lighting helps your video stand out</li>
                  <li>• You can re-record anytime</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRecording(!isRecording)}
                className="px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all"
              >
                <Video className="w-5 h-5" />
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVideoUploaded(true)}
                className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Video</span>
              </motion.button>
            </div>

            {/* Recording Timer */}
            {isRecording && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  <span className="text-red-600 font-bold text-2xl">● Recording...</span>
                  <p className="text-gray-600 text-sm mt-1">00:25 / 90 seconds</p>
                </motion.div>
              </motion.div>
            )}

            {videoUploaded && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-900">Video uploaded!</p>
                  <p className="text-sm text-green-800">Your video resume has been added to your profile</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: '📈', title: 'Higher Match Rate', desc: 'Video resumes get 3x more views' },
            { icon: '⭐', title: 'Stand Out', desc: 'Showcase your personality to employers' },
            { icon: '🚀', title: 'Faster Hiring', desc: 'Get hired 40% faster with video resume' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-card p-6 border border-gray-100 text-center"
            >
              <p className="text-4xl mb-3">{benefit.icon}</p>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
