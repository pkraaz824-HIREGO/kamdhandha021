'use client'

import { motion } from 'framer-motion'
import { Plus, Zap, X, Loader, Tag, Calendar, Briefcase, MapPin, Building2, Users, DollarSign, Eye, Mail } from 'lucide-react'
import { useState } from 'react'

interface JobCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface JobFormData {
  jobTitle: string
  companyName: string
  jobLocation: string
  officeAddress: string
  workType: string
  workMode: string
  interviewType: string
  experienceLevel: string
  numOpenings: number
  applicationDeadline: string
  jobDescription: string
  keyResponsibilities: string[]
  requiredSkills: string[]
  preferredSkills: string[]
  tools: string[]
  department: string
  minQualification: string
  preferredQualification: string
  experienceYears: string
  certifications: string
  salaryMin: string
  salaryMax: string
  currency: string
  payType: string
  equity: string
  benefits: string[]
  aboutCompany: string
  companyWebsite: string
  recruiterName: string
  recruiterEmail: string
  hiringType: string
  applicationMethod: string
  externalLink: string
  resumeRequired: boolean
  videoResumeRequired: boolean
  skillTestRequired: boolean
  interviewRounds: string
  aiInterviewEnabled: boolean
  jobVisibility: string
  jobStatus: string
}

const initialFormData: JobFormData = {
  jobTitle: '',
  companyName: '',
  jobLocation: '',
  officeAddress: '',
  workType: 'Full-time',
  workMode: 'On-site',
  interviewType: 'Both',
  experienceLevel: '0-1 year',
  numOpenings: 1,
  applicationDeadline: '',
  jobDescription: '',
  keyResponsibilities: [],
  requiredSkills: [],
  preferredSkills: [],
  tools: [],
  department: '',
  minQualification: "Bachelor's Degree",
  preferredQualification: '',
  experienceYears: '2-4',
  certifications: '',
  salaryMin: '',
  salaryMax: '',
  currency: '₹',
  payType: 'Annual',
  equity: '',
  benefits: [],
  aboutCompany: '',
  companyWebsite: '',
  recruiterName: '',
  recruiterEmail: '',
  hiringType: 'Direct Hiring',
  applicationMethod: 'Portal',
  externalLink: '',
  resumeRequired: true,
  videoResumeRequired: false,
  skillTestRequired: false,
  interviewRounds: '3',
  aiInterviewEnabled: true,
  jobVisibility: 'Public',
  jobStatus: 'Active',
}

export default function JobCreationModal({ isOpen, onClose }: JobCreationModalProps) {
  const [mode, setMode] = useState<'manual' | 'auto'>('manual')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeSection, setActiveSection] = useState(1)
  const [formData, setFormData] = useState<JobFormData>(initialFormData)
  const [tagInputs, setTagInputs] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const addTag = (fieldName: keyof JobFormData) => {
    const inputKey = `${fieldName}-input`
    const value = tagInputs[inputKey]?.trim() || ''

    if (!value) return

    const fieldValue = formData[fieldName]
    if (Array.isArray(fieldValue)) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: [...fieldValue, value],
      }))
    }
    setTagInputs((prev) => ({ ...prev, [inputKey]: '' }))
  }

  const removeTag = (fieldName: keyof JobFormData, index: number) => {
    const fieldValue = formData[fieldName]
    if (Array.isArray(fieldValue)) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: fieldValue.filter((_, i) => i !== index),
      }))
    }
  }

  const handleAutoGenerate = async () => {
    // AI Auto-generate functionality removed - Manual writing only
    return
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Job posting submitted:', formData)
    alert('Job posting created successfully!')
    onClose()
    setFormData(initialFormData)
    setActiveSection(1)
  }

  if (!isOpen) return null

  const sections = [
    { id: 1, name: 'Basic Info', icon: '📋' },
    { id: 2, name: 'Job Details', icon: '📝' },
    { id: 3, name: 'Qualification', icon: '🎓' },
    { id: 4, name: 'Compensation', icon: '💰' },
    { id: 5, name: 'Company Info', icon: '🏢' },
    { id: 6, name: 'Application', icon: '📧' },
    { id: 7, name: 'Visibility', icon: '👁️' },
  ]

  const renderTagInput = (fieldName: keyof JobFormData, label: string) => {
    const fieldValue = formData[fieldName]
    const inputKey = `${fieldName}-input`

    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={`Add ${label}...`}
            value={tagInputs[inputKey] || ''}
            onChange={(e) => setTagInputs((prev) => ({ ...prev, [inputKey]: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(fieldName))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white"
          />
          <button
            type="button"
            onClick={() => addTag(fieldName)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(fieldValue) &&
            fieldValue.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(fieldName, idx)}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-5xl h-[92vh] flex flex-col border border-gray-200/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section - Compact 3D Design */}
        <div className="bg-gradient-to-b from-white to-blue-50/40 rounded-t-3xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-b border-gray-200/40 px-8 py-4">
          {/* Title Area */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Post a New Job Opening</h2>
              <p className="text-gray-500 mt-0.5 text-xs">Step {activeSection} of 7</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Mode Selection - Removed: Manual Writing Only */}
          {/* User focuses on manual job description writing */}
        </div>

        {/* Progress Steps - Compact */}
        <div className="px-8 py-4 bg-white/60 backdrop-blur-sm border-b border-gray-200/30">
          <div className="flex items-center justify-between gap-1 mb-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-col items-center transition-all flex-1 ${
                  activeSection === section.id ? 'opacity-100' : activeSection > section.id ? 'opacity-100' : 'opacity-40 hover:opacity-60'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                    : activeSection > section.id
                    ? 'bg-green-500 text-white text-sm'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {activeSection > section.id ? '✓' : section.id}
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-1 leading-tight text-center">{section.name}</span>
              </motion.button>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeSection / 7) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          {/* Section 1 */}
          {activeSection === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Basic Job Information</h3>
                <p className="text-gray-500 text-sm mt-1">Essential details about the position</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Full Stack Developer"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech Solutions Inc."
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangalore, India"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                {formData.workMode === 'On-site' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Office Address *</label>
                    <input
                      type="text"
                      name="officeAddress"
                      value={formData.officeAddress}
                      onChange={handleInputChange}
                      placeholder="e.g., 123 Tech Street"
                      required={formData.workMode === 'On-site'}
                      className="w-full px-3 py-2.5 border border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-blue-50 font-medium text-sm"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Work Type
                  </label>
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Work Mode</label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>On-site</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Interview Type</label>
                  <select
                    name="interviewType"
                    value={formData.interviewType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>Both</option>
                    <option>Virtual Only</option>
                    <option>On-site Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>Fresher</option>
                    <option>0-1 year</option>
                    <option>2-4 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Openings
                  </label>
                  <input
                    type="number"
                    name="numOpenings"
                    value={formData.numOpenings}
                    onChange={(e) => setFormData(prev => ({ ...prev, numOpenings: parseInt(e.target.value) }))}
                    min="1"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Deadline
                  </label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2 */}
          {activeSection === 2 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Job Details</h3>
                <p className="text-gray-500 text-sm mt-1">Write comprehensive information about the role</p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Engineering"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Job Description</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                  <p className="text-xs text-blue-900 font-semibold mb-3">📝 Choose a Header Style for Your Job Description:</p>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + '\n\n## About This Role\n' }))}
                      className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md font-semibold hover:bg-blue-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      About This Role
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + `\n\n## What You Will Do\n` }))}
                      className="px-3 py-2 bg-purple-500 text-white text-xs rounded-md font-semibold hover:bg-purple-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      What You Will Do
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + '\n\n## Who You Are\n' }))}
                      className="px-3 py-2 bg-green-500 text-white text-xs rounded-md font-semibold hover:bg-green-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      Who You Are
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + '\n\n## Why Join Us\n' }))}
                      className="px-3 py-2 bg-orange-500 text-white text-xs rounded-md font-semibold hover:bg-orange-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      Why Join Us
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + '\n\n## Benefits\n' }))}
                      className="px-3 py-2 bg-pink-500 text-white text-xs rounded-md font-semibold hover:bg-pink-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      Benefits
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData(prev => ({ ...prev, jobDescription: (prev.jobDescription ? prev.jobDescription : '') + '\n\n## Growth Opportunities\n' }))}
                      className="px-3 py-2 bg-indigo-500 text-white text-xs rounded-md font-semibold hover:bg-indigo-600 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      Growth Opportunities
                    </motion.button>
                  </div>
                </div>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Write a detailed job description... Explain the role, responsibilities, and what makes this position unique."
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-vertical bg-white text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Key Responsibilities</label>
                {renderTagInput('keyResponsibilities', 'responsibility')}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Required Skills</label>
                {renderTagInput('requiredSkills', 'skill')}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Preferred Skills</label>
                {renderTagInput('preferredSkills', 'skill')}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Tools & Frameworks</label>
                {renderTagInput('tools', 'tool')}
              </div>
            </div>
          )}

          {/* Section 3 */}
          {activeSection === 3 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Qualifications & Experience</h3>
                <p className="text-gray-500 text-sm mt-1">Requirements for candidates</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Min. Qualification</label>
                <select
                  name="minQualification"
                  value={formData.minQualification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                >
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Diploma</option>
                  <option>High School</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Preferred Qualification</label>
                <input
                  type="text"
                  name="preferredQualification"
                  value={formData.preferredQualification}
                  onChange={handleInputChange}
                  placeholder="e.g., Master's in CS"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Experience Required</label>
                <select
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                >
                  <option>0-1</option>
                  <option>1-2</option>
                  <option>2-4</option>
                  <option>5+</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Certifications</label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="e.g., AWS Certified"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                />
              </div>
            </div>
          )}

          {/* Section 4 */}
          {activeSection === 4 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Compensation & Benefits</h3>
                <p className="text-gray-500 text-sm mt-1">Salary and perks details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> Min Salary
                  </label>
                  <input
                    type="text"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                    placeholder="500000"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Max Salary</label>
                  <input
                    type="text"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                    placeholder="1200000"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>₹</option>
                    <option>$</option>
                    <option>€</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pay Type</label>
                  <select
                    name="payType"
                    value={formData.payType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>Monthly</option>
                    <option>Annual</option>
                    <option>Hourly</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Equity / ESOP</label>
                  <input
                    type="text"
                    name="equity"
                    value={formData.equity}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.5% stock"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Benefits Offered</label>
                {renderTagInput('benefits', 'benefit')}
              </div>
            </div>
          )}

          {/* Section 5 */}
          {activeSection === 5 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Company & Hiring Info</h3>
                <p className="text-gray-500 text-sm mt-1">Company details and recruiter info</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> About Company
                </label>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleInputChange}
                  placeholder="Brief company overview..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Hiring Type</label>
                  <select
                    name="hiringType"
                    value={formData.hiringType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  >
                    <option>Direct Hiring</option>
                    <option>Through Agency</option>
                    <option>Third-party Recruiter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Recruiter Name</label>
                  <input
                    type="text"
                    name="recruiterName"
                    value={formData.recruiterName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input
                    type="email"
                    name="recruiterEmail"
                    value={formData.recruiterEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 6 */}
          {activeSection === 6 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Application Preferences</h3>
                <p className="text-gray-500 text-sm mt-1">How candidates should apply</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Application Method</label>
                <select
                  name="applicationMethod"
                  value={formData.applicationMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                >
                  <option>Apply via Portal</option>
                  <option>External Link</option>
                  <option>Email Resume</option>
                </select>
              </div>

              {formData.applicationMethod === 'External Link' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">External Link</label>
                  <input
                    type="url"
                    name="externalLink"
                    value={formData.externalLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/apply"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="resumeRequired"
                    checked={formData.resumeRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    id="resume"
                  />
                  <label htmlFor="resume" className="text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer flex-1">Resume Required</label>
                </div>

                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="videoResumeRequired"
                    checked={formData.videoResumeRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    id="video"
                  />
                  <label htmlFor="video" className="text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer flex-1">Video Resume Required</label>
                </div>

                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="skillTestRequired"
                    checked={formData.skillTestRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    id="skill"
                  />
                  <label htmlFor="skill" className="text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer flex-1">Skill Test Required</label>
                </div>

                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="aiInterviewEnabled"
                    checked={formData.aiInterviewEnabled}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    id="ai"
                  />
                  <label htmlFor="ai" className="text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer flex-1">Enable AI Interview</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Interview Rounds</label>
                <input
                  type="text"
                  name="interviewRounds"
                  value={formData.interviewRounds}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                />
              </div>
            </div>
          )}

          {/* Section 7 */}
          {activeSection === 7 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Visibility & Status</h3>
                <p className="text-gray-500 text-sm mt-1">Final publication settings</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Job Visibility
                </label>
                <select
                  name="jobVisibility"
                  value={formData.jobVisibility}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                >
                  <option>Public</option>
                  <option>Private</option>
                  <option>Invite Only</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Job Status</label>
                <select
                  name="jobStatus"
                  value={formData.jobStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-white text-sm"
                >
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900 font-semibold">
                  ✅ Summary: You're posting <strong className="text-blue-700">{formData.jobTitle || 'a job'}</strong> at <strong className="text-blue-700">{formData.companyName || 'your company'}</strong> with <strong className="text-blue-700">{formData.numOpenings} opening(s)</strong>.
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex gap-2 p-6 border-t border-gray-200/30 bg-white sticky bottom-0 z-10 justify-between">
          {activeSection > 1 && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(activeSection - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition-all"
            >
              ← Previous
            </motion.button>
          )}
          {activeSection < 7 && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(activeSection + 1)}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold text-sm transition-all hover:bg-blue-600"
            >
              Next →
            </motion.button>
          )}

          {activeSection === 7 && (
            <motion.button
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              Publish
            </motion.button>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition-all"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
