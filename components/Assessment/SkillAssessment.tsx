'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Award } from 'lucide-react'
import { useState } from 'react'

interface Question {
  id: number
  type: 'mcq' | 'coding' | 'situational'
  question: string
  options?: string[]
  timeLimit: number
}

const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(2^n)'],
    timeLimit: 30,
  },
  {
    id: 2,
    type: 'coding',
    question: 'Write a function to reverse a string',
    timeLimit: 120,
  },
  {
    id: 3,
    type: 'situational',
    question: 'How would you handle a conflict with a team member?',
    timeLimit: 90,
  },
]

export default function SkillAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mockQuestions[0].timeLimit)

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

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!completed ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-card p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Assessment</h1>
                  <p className="text-gray-600">Question {currentQuestion + 1} of {mockQuestions.length}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-600">{timeLeft}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-blue-500"
                ></motion.div>
              </div>
            </motion.div>

            {/* Question Card */}
            <motion.div
              variants={itemVariants}
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-card p-8 border border-gray-100 space-y-6"
            >
              {/* Question Type Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  question.type === 'mcq'
                    ? 'bg-blue-100 text-blue-700'
                    : question.type === 'coding'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {question.type === 'mcq' ? 'Multiple Choice' : question.type === 'coding' ? 'Coding Challenge' : 'Situational'}
                </span>
                <span className="text-sm text-gray-600">~{question.timeLimit} seconds</span>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>

              {/* Answer Section */}
              {question.type === 'mcq' && question.options ? (
                <div className="space-y-3">
                  {question.options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 10 }}
                      onClick={() => setAnswers({ ...answers, [question.id]: option })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                        answers[question.id] === option
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="text-gray-700">{option}</span>
                    </motion.button>
                  ))}
                </div>
              ) : question.type === 'coding' ? (
                <div className="space-y-3">
                  <textarea
                    placeholder="Write your code here..."
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none font-mono text-sm"
                  ></textarea>
                  <p className="text-xs text-gray-500">Syntax highlighting and auto-complete available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span>Record Video Response</span>
                  </button>
                  <textarea
                    placeholder="Or type your response here..."
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-between"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>

              {currentQuestion === mockQuestions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCompleted(true)}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Assessment
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Next
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-card p-12 border border-gray-100 text-center space-y-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2 }}
            >
              <Award className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
              <p className="text-gray-600 text-lg">Your responses are being evaluated by our AI</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-2">Estimated Results Time</p>
              <p className="text-3xl font-bold text-green-600">24 hours</p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-8">
              {[
                { label: 'Questions', value: mockQuestions.length },
                { label: 'Time Spent', value: '8m 32s' },
                { label: 'Completion', value: '100%' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Return to Dashboard
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
