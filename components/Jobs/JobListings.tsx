'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, Users, Clock, Star, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

interface JobCard {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  applicants: number
  matchScore: number
  description: string
  tags: string[]
  postedDate: string
  isFeatured: boolean
}

const mockJobs: JobCard[] = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$180K - $240K',
    type: 'Full-time',
    applicants: 247,
    matchScore: 96,
    description: 'Build scalable web applications using React and Node.js',
    tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
    postedDate: '2 days ago',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '$200K - $280K',
    type: 'Full-time',
    applicants: 189,
    matchScore: 89,
    description: 'Work on cutting-edge AI/ML models and systems',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'ML Ops'],
    postedDate: '5 days ago',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$150K - $210K',
    type: 'Full-time',
    applicants: 156,
    matchScore: 85,
    description: 'Lead product strategy and development initiatives',
    tags: ['Product Strategy', 'Analytics', 'Leadership'],
    postedDate: '1 week ago',
    isFeatured: false,
  },
]

export default function JobListings() {
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [filterType, setFilterType] = useState<'all' | 'featured'>('all')

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

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const filteredJobs = filterType === 'featured' ? mockJobs.filter((j) => j.isFeatured) : mockJobs

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Discover roles matched to your profile</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-500'
            }`}
          >
            All Jobs ({mockJobs.length})
          </button>
          <button
            onClick={() => setFilterType('featured')}
            className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
              filterType === 'featured'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-500'
            }`}
          >
            <Star className="w-4 h-4" />
            Featured ({mockJobs.filter((j) => j.isFeatured).length})
          </button>
        </motion.div>

        {/* Job Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl shadow-card border border-gray-100 hover:border-primary-300 transition-all overflow-hidden group"
            >
              <div className="p-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                  {/* Job Header */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary-600">
                        {job.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        {job.isFeatured && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block mb-2"
                          >
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          </motion.div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-primary-600 font-semibold mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Stats */}
                  <div className="flex flex-col gap-4 lg:text-right">
                    {/* Salary */}
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Salary Range</p>
                      <p className="text-2xl font-bold text-green-600">{job.salary}</p>
                    </div>

                    {/* Match Score */}
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Your Match</p>
                      <div className="flex items-center justify-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary-600">{job.matchScore}%</p>
                          <p className="text-xs text-gray-500">AI Match</p>
                        </div>
                        <div className="relative w-14 h-14">
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
                              animate={{ strokeDashoffset: 163.36 * (1 - job.matchScore / 100) }}
                              transition={{ duration: 1.5, delay: index * 0.1 + 0.3 }}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{job.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium border border-primary-200 hover:bg-primary-100 transition-all cursor-pointer"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      <span className="font-bold text-gray-900">{job.applicants}</span> applicants
                    </span>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleSaveJob(job.id)}
                      className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 border-2 ${
                        savedJobs.includes(job.id)
                          ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                          : 'border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 md:flex-none px-6 py-3 rounded-lg font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className="h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-cyan-500 origin-left"
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
