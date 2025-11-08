'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Award, Building2, Briefcase, Calendar, 
  Code, MessageSquare, Zap, MapPin,
  Copy, Check, Link as LinkIcon, Camera, X, UserPlus, Download, Edit3, Share2
} from 'lucide-react'

interface SkillProfile {
  name: string
  proficiency: number
  required: number
  category: 'technical' | 'communication' | 'confidence'
}

interface UserProfile {
  id: string
  name: string
  title: string
  company: string
  location: string
  email: string
  phone: string
  avatar: string
  coverImage: string
  bio: string
  experience: number
  currentPosition: string
  jobTitle: string
  skills: SkillProfile[]
  experience_details: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    year: string
  }>
}

const mockProfile: UserProfile = {
  id: '1',
  name: 'Amrit Kumar',
  title: 'Full Stack Developer',
  company: 'Google',
  location: 'San Francisco, CA',
  email: 'amrit@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'AK',
  coverImage: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
  bio: 'Full Stack Developer with 5+ years of expertise building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
  experience: 5,
  currentPosition: 'Senior Full Stack Engineer @ Google',
  jobTitle: 'Senior Full Stack Engineer',
  skills: [
    { name: 'React', proficiency: 95, required: 90, category: 'technical' },
    { name: 'Node.js', proficiency: 88, required: 85, category: 'technical' },
    { name: 'TypeScript', proficiency: 92, required: 80, category: 'technical' },
    { name: 'Database Design', proficiency: 85, required: 75, category: 'technical' },
    { name: 'AWS', proficiency: 78, required: 70, category: 'technical' },
    { name: 'Team Communication', proficiency: 90, required: 85, category: 'communication' },
    { name: 'Presentation Skills', proficiency: 82, required: 80, category: 'communication' },
    { name: 'Documentation', proficiency: 88, required: 75, category: 'communication' },
    { name: 'Client Interaction', proficiency: 85, required: 70, category: 'communication' },
    { name: 'Problem Solving', proficiency: 95, required: 90, category: 'confidence' },
    { name: 'Leadership', proficiency: 80, required: 75, category: 'confidence' },
    { name: 'Adaptability', proficiency: 88, required: 85, category: 'confidence' },
    { name: 'Time Management', proficiency: 85, required: 80, category: 'confidence' },
  ],
  experience_details: [
    {
      company: 'Google',
      position: 'Senior Full Stack Developer',
      duration: '2021 - Present',
      description: 'Leading development of core platform features using React, Node.js, and cloud infrastructure.'
    },
    {
      company: 'Microsoft',
      position: 'Full Stack Developer',
      duration: '2019 - 2021',
      description: 'Developed and maintained multiple web applications with focus on performance optimization.'
    },
    {
      company: 'StartupXYZ',
      position: 'Junior Developer',
      duration: '2018 - 2019',
      description: 'Started career building web applications using modern JavaScript frameworks.'
    }
  ],
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon', year: '2023' },
    { name: 'Google Cloud Professional', issuer: 'Google', year: '2022' },
    { name: 'React Advanced Patterns', issuer: 'Udemy', year: '2021' }
  ]
}

export default function ProfessionalProfile() {
  const [profile] = useState(mockProfile)
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience' | 'certifications'>('overview')
  const [copySuccess, setCopySuccess] = useState(false)
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [photoImage, setPhotoImage] = useState<string | null>(null)

  const publicProfileUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://hireg.ai'}/profile/${profile.id}`

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBannerImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicProfileUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const technicalSkills = profile.skills.filter(s => s.category === 'technical')
  const communicationSkills = profile.skills.filter(s => s.category === 'communication')
  const confidenceSkills = profile.skills.filter(s => s.category === 'confidence')

  const SkillProgressBar = ({ skill }: { skill: SkillProfile }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-lime-400 font-bold text-sm">{skill.proficiency}%</span>
          <span className="text-gray-500 text-xs">Required: {skill.required}%</span>
        </div>
      </div>
      <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-lime-500 to-green-600 rounded-full"
        />
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-orange-500/30">
        <div
          className="h-full bg-orange-500/40 rounded-full"
          style={{ width: `${skill.required}%` }}
        />
      </div>
      {skill.proficiency >= skill.required && (
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-green-400 text-xs font-medium">Meets requirement</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Banner Upload Section */}
      <div className="relative h-40 overflow-hidden group bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 shadow-2xl">
        {bannerImage ? (
          <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full ${profile.coverImage}`}></div>
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
        <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col items-center gap-2 bg-black/60 px-4 py-3 rounded-lg">
            <Camera className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-sm">Upload Banner</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-32 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo Upload */}
            <div className="relative group flex-shrink-0">
              <div className="w-48 h-48 rounded-3xl border-4 border-lime-400/40 flex items-center justify-center text-gray-900 font-bold text-6xl shadow-[0_20px_40px_rgba(132,204,22,0.4)] overflow-hidden bg-gradient-to-br from-lime-500 to-green-600 hover:shadow-[0_25px_50px_rgba(132,204,22,0.5)] transition-shadow">
                {photoImage ? (
                  <img src={photoImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile.avatar
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Header Info */}
            <div className="flex-1 pt-6">
              <h1 className="text-5xl font-bold text-white mb-3">{profile.name}</h1>
              <p className="text-2xl text-lime-400 font-semibold mb-4">{profile.title}</p>

              <div className="flex flex-wrap gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{profile.experience} years experience</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-gray-900 rounded-2xl font-bold flex items-center gap-2 shadow-[0_12px_28px_rgba(132,204,22,0.4)] hover:shadow-[0_16px_40px_rgba(132,204,22,0.5)] transition-all border border-lime-300/30"
                >
                  <UserPlus className="w-4 h-4" />
                  Connect
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl font-bold hover:from-slate-600 hover:to-slate-700 transition-all flex items-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-slate-600/60"
                >
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-gradient-to-br from-lime-600/30 to-green-700/30 border-2 border-lime-400/60 rounded-3xl p-4 shadow-[0_15px_40px_rgba(132,204,22,0.35)] backdrop-blur-md hover:shadow-[0_20px_50px_rgba(132,204,22,0.45)] transition-all inline-block"
        >
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 bg-gradient-to-br from-lime-500/40 to-green-600/40 p-2 rounded-xl border border-lime-400/40 shadow-[0_8px_16px_rgba(132,204,22,0.2)]">
              <LinkIcon className="w-4 h-4 text-lime-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 font-mono text-xs truncate block">{publicProfileUrl}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-lime-500 to-green-600 text-gray-900 rounded-lg hover:shadow-[0_8px_16px_rgba(132,204,22,0.3)] border-0 transition-all flex-shrink-0 text-xs font-bold shadow-[0_4px_12px_rgba(132,204,22,0.25)]"
            >
              {copySuccess ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex gap-4 border-b-2 border-slate-600/40 overflow-x-auto"
        >
          {(['overview', 'skills', 'experience', 'certifications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 font-bold text-base transition-all border-b-4 whitespace-nowrap ${
                activeTab === tab
                  ? 'text-lime-400 border-lime-400 shadow-[0_4px_12px_rgba(132,204,22,0.2)]'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 mt-12"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 border-3 border-blue-400/50 rounded-4xl p-8 shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.5)] transition-all backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-5 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border-2 border-blue-500/40 rounded-3xl p-6 shadow-[0_12px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.4)] transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/30 rounded-lg border border-blue-400/40">
                    <Code className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Technical</h3>
                </div>
                {technicalSkills.map((skill) => (
                  <SkillProgressBar key={skill.name} skill={skill} />
                ))}
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border-2 border-purple-500/40 rounded-3xl p-6 shadow-[0_12px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.4)] transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/30 rounded-lg border border-purple-400/40">
                    <MessageSquare className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Communication</h3>
                </div>
                {communicationSkills.map((skill) => (
                  <SkillProgressBar key={skill.name} skill={skill} />
                ))}
              </div>

              <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 border-2 border-orange-500/40 rounded-3xl p-6 shadow-[0_12px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_16px_40px_rgba(234,88,12,0.4)] transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/30 rounded-lg border border-orange-400/40">
                    <Zap className="w-5 h-5 text-orange-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Confidence</h3>
                </div>
                {confidenceSkills.map((skill) => (
                  <SkillProgressBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-5">
              {profile.experience_details.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 border-2 border-slate-600/40 rounded-3xl p-6 shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl shadow-[0_8px_16px_rgba(132,204,22,0.3)] border border-lime-300/30 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{exp.position}</h4>
                      <p className="text-lime-400 font-semibold text-base mb-3">{exp.company}</p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-gray-400 text-base">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 border-2 border-slate-600/40 rounded-3xl p-8 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-gradient-to-br from-lime-500/30 to-green-600/30 rounded-2xl border border-lime-400/40 flex-shrink-0 shadow-[0_8px_16px_rgba(132,204,22,0.2)]">
                      <Award className="w-7 h-7 text-lime-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                      <p className="text-gray-400 text-base mb-2">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Extra Space for Footer */}
      <div className="h-40"></div>
    </div>
  )
}
