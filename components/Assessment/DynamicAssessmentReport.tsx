'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  AssessmentMapper,
  PROFILE_TYPES,
  AssessmentResult,
  AssessmentReport,
  GeneratedSkillProfile,
  SkillGap,
  Recommendation
} from '@/lib/assessmentMapper'
import {
  TrendingUp, TrendingDown, CheckCircle, AlertCircle, Award,
  Code, MessageSquare, Zap, Target, Lightbulb, Download
} from 'lucide-react'

// Mock assessment data for different profile types
const mockAssessments: Record<string, AssessmentResult[]> = {
  frontend_developer: [
    {
      assessmentId: 'code-1',
      type: 'coding',
      score: 92,
      feedback: 'Excellent React implementation with proper hooks',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: 'React/Vue/Angular'
    },
    {
      assessmentId: 'code-2',
      type: 'coding',
      score: 85,
      feedback: 'Good CSS skills, some optimization opportunities',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      category: 'CSS/Styling'
    },
    {
      assessmentId: 'case-1',
      type: 'case-study',
      score: 88,
      feedback: 'Strong problem-solving approach',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'Problem Solving'
    },
    {
      assessmentId: 'comm-1',
      type: 'communication',
      score: 76,
      feedback: 'Clear explanation, could improve depth',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: 'Communication'
    }
  ],
  backend_developer: [
    {
      assessmentId: 'code-1',
      type: 'coding',
      score: 94,
      feedback: 'Excellent database design patterns',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: 'Database Design'
    },
    {
      assessmentId: 'tech-1',
      type: 'technical',
      score: 89,
      feedback: 'Strong understanding of system architecture',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      category: 'System Design'
    },
    {
      assessmentId: 'case-1',
      type: 'case-study',
      score: 86,
      feedback: 'Good API design thinking',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'API Design'
    },
    {
      assessmentId: 'comm-1',
      type: 'communication',
      score: 72,
      feedback: 'Technical communication needs improvement',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: 'Technical Communication'
    }
  ],
  product_manager: [
    {
      assessmentId: 'case-1',
      type: 'case-study',
      score: 90,
      feedback: 'Excellent strategic thinking',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      category: 'Product Strategy'
    },
    {
      assessmentId: 'comm-1',
      type: 'communication',
      score: 88,
      feedback: 'Clear and persuasive communication',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      category: 'Communication Skills'
    },
    {
      assessmentId: 'behav-1',
      type: 'behavioral',
      score: 85,
      feedback: 'Good decision-making process',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: 'Leadership'
    },
    {
      assessmentId: 'case-2',
      type: 'case-study',
      score: 80,
      feedback: 'Decent user research approach',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: 'User Research'
    }
  ]
}

export default function DynamicAssessmentReport() {
  const [selectedProfile, setSelectedProfile] = useState('frontend_developer')
  const [report, setReport] = useState<AssessmentReport | null>(null)

  const handleGenerateReport = (profileId: string) => {
    setSelectedProfile(profileId)
    const assessments = mockAssessments[profileId] || []
    const generatedReport = AssessmentMapper.generateReport(
      'candidate-001',
      profileId,
      assessments
    )
    setReport(generatedReport)
  }

  const getCategoryIcon = (category: 'technical' | 'communication' | 'confidence') => {
    switch (category) {
      case 'technical':
        return <Code className="w-5 h-5" />
      case 'communication':
        return <MessageSquare className="w-5 h-5" />
      case 'confidence':
        return <Zap className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: 'technical' | 'communication' | 'confidence') => {
    switch (category) {
      case 'technical':
        return 'text-blue-400 border-blue-500/40'
      case 'communication':
        return 'text-purple-400 border-purple-500/40'
      case 'confidence':
        return 'text-orange-400 border-orange-500/40'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">📊 Dynamic Assessment Report</h1>
          <p className="text-gray-400">Automatically mapped based on profile type requirements</p>
        </motion.div>

        {/* Profile Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          <h2 className="text-lg font-bold text-white mb-3">Select Profile Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {AssessmentMapper.getAllProfileTypes().map((profile) => (
              <motion.button
                key={profile.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGenerateReport(profile.id)}
                className={`p-3 rounded-xl font-bold border-2 transition-all text-sm ${
                  selectedProfile === profile.id
                    ? 'bg-lime-500/20 text-lime-400 border-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.5)]'
                    : 'bg-slate-700 text-gray-300 border-slate-600 hover:border-lime-500/50'
                }`}
              >
                {profile.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Report Display */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-lime-500/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{report.profileType}</h2>
                  <p className="text-gray-400 text-sm">Candidate ID: {report.candidateId}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-lime-400">{report.overallScore}%</div>
                  <p className="text-gray-400 text-xs">Overall Score</p>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${report.overallScore}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-lime-500 to-green-600"
                />
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Technical Skills */}
              <SkillCategorySection
                title="Technical Skills"
                icon={<Code className="w-6 h-6 text-blue-400" />}
                color="blue"
                skills={report.skills.filter(s => s.category === 'technical')}
              />

              {/* Communication Skills */}
              <SkillCategorySection
                title="Communication"
                icon={<MessageSquare className="w-6 h-6 text-purple-400" />}
                color="purple"
                skills={report.skills.filter(s => s.category === 'communication')}
              />

              {/* Confidence Skills */}
              <SkillCategorySection
                title="Confidence"
                icon={<Zap className="w-6 h-6 text-orange-400" />}
                color="orange"
                skills={report.skills.filter(s => s.category === 'confidence')}
              />
            </div>

            {/* Strengths & Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Strengths */}
              <StrengthsSection strengths={report.strengths} />

              {/* Gaps */}
              <GapsSection gaps={report.gaps} />
            </div>

            {/* Recommendations */}
            <RecommendationsSection recommendations={report.recommendations} />

            {/* Assessment Details */}
            <AssessmentDetailsSection assessments={report.assessmentsConducted} />
          </motion.div>
        )}

        {!report && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Select a profile type to generate report</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Helper Components
function SkillCategorySection({
  title,
  icon,
  color,
  skills
}: {
  title: string
  icon: React.ReactNode
  color: 'blue' | 'purple' | 'orange'
  skills: GeneratedSkillProfile[]
}) {
  const borderColor = {
    blue: 'border-blue-500/40',
    purple: 'border-purple-500/40',
    orange: 'border-orange-500/40'
  }[color]

  return (
    <div className={`bg-gradient-to-br from-slate-800 to-gray-900 border ${borderColor} rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {skills.length === 0 ? (
          <p className="text-gray-500 text-xs">No skills in this category</p>
        ) : (
          skills.map((skill) => (
            <SkillProgressBar key={skill.skillName} skill={skill} />
          ))
        )}
      </div>
    </div>
  )
}

function SkillProgressBar({ skill }: { skill: GeneratedSkillProfile }) {
  const isMet = skill.proficiency >= skill.required

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-300 font-medium">{skill.skillName}</span>
        <div className="flex items-center gap-1">
          <span className={`text-xs font-bold ${isMet ? 'text-green-400' : 'text-orange-400'}`}>
            {skill.proficiency}%
          </span>
          {isMet && <CheckCircle className="w-3 h-3 text-green-400" />}
        </div>
      </div>
      <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${isMet ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}
        />
      </div>
      <div className="text-xs text-gray-500 mt-0.5">Required: {skill.required}%</div>
    </div>
  )
}

function StrengthsSection({ strengths }: { strengths: SkillGap[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 mb-4">
        <Award className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-bold text-white">Strengths</h3>
      </div>

      <div className="space-y-2">
        {strengths.length === 0 ? (
          <p className="text-gray-500 text-sm">Continue building all skills</p>
        ) : (
          strengths.map((strength) => (
            <div key={strength.skill} className="bg-slate-700/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-green-400">{strength.skill}</p>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-sm text-gray-400">
                {strength.current}% (Exceeds requirement by {strength.gap}%)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function GapsSection({ gaps }: { gaps: SkillGap[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-orange-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-5 h-5 text-orange-400" />
        <h3 className="text-lg font-bold text-white">Development Areas</h3>
      </div>

      <div className="space-y-2">
        {gaps.length === 0 ? (
          <p className="text-gray-500 text-sm">All skills meet requirements!</p>
        ) : (
          gaps.map((gap) => (
            <div key={gap.skill} className="bg-slate-700/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-orange-400">{gap.skill}</p>
                <TrendingDown className="w-4 h-4 text-orange-400" />
              </div>
              <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${(gap.current / gap.required) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {gap.current}% / {gap.required}% (Gap: {gap.gap}%)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function RecommendationsSection({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-white">Recommendations</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-3 border ${
              rec.priority === 'high'
                ? 'bg-red-500/10 border-red-500/40'
                : rec.priority === 'medium'
                ? 'bg-yellow-500/10 border-yellow-500/40'
                : 'bg-blue-500/10 border-blue-500/40'
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <p className={`font-bold text-xs ${
                rec.priority === 'high'
                  ? 'text-red-400'
                  : rec.priority === 'medium'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
              }`}>
                {rec.type.toUpperCase()}
              </p>
              <span className={`text-xs px-1.5 py-0.5 rounded text-xs ${
                rec.priority === 'high'
                  ? 'bg-red-500/20 text-red-400'
                  : rec.priority === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {rec.priority}
              </span>
            </div>
            <p className="text-gray-300 text-xs font-medium mb-1">{rec.skill}</p>
            <p className="text-gray-400 text-xs">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AssessmentDetailsSection({ assessments }: { assessments: AssessmentResult[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 mb-4">
        <Download className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-bold text-white">Assessment Details</h3>
      </div>

      <div className="space-y-2">
        {assessments.map((assessment) => (
          <div key={assessment.assessmentId} className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="font-medium text-white text-sm capitalize">{assessment.type}</p>
                <p className="text-xs text-gray-400">{assessment.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-lime-400">{assessment.score}%</p>
                <p className="text-xs text-gray-500">{assessment.timestamp.toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic">{assessment.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
