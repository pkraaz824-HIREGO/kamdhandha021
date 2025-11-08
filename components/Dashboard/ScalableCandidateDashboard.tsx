'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  DashboardConfig,
  JobCategory,
  getDashboardConfig,
  getJobsByCategory,
  getTotalJobsInMarket,
  getTotalCompaniesHiring,
  getAverageSalaryRange,
  DASHBOARD_CONFIGS
} from '@/lib/jobCategoryConfig'
import {
  ArrowRight, TrendingUp, Users, Building2, Search, Filter,
  ExternalLink, Star, Clock, MapPin, DollarSign, Zap
} from 'lucide-react'
import Link from 'next/link'

export default function ScalableCandidateDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('tech')
  const [searchQuery, setSearchQuery] = useState('')

  const config = getDashboardConfig(selectedCategory)
  const jobsInCategory = getJobsByCategory(selectedCategory)
  const salaryRange = getAverageSalaryRange(selectedCategory)
  const totalJobs = getTotalJobsInMarket()
  const totalCompanies = getTotalCompaniesHiring()

  const filteredJobs = jobsInCategory.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header with Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-gray-900 border-b border-slate-700 p-6 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🎯 Career Dashboard</h1>
              <p className="text-gray-400">Explore {totalJobs.toLocaleString()}+ job opportunities across {Object.keys(DASHBOARD_CONFIGS).length}+ categories</p>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500/10 border border-blue-500/40 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Jobs in Market</p>
                  <p className="text-2xl font-bold text-blue-400">{totalJobs.toLocaleString()}+</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/40 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hiring Companies</p>
                  <p className="text-2xl font-bold text-green-400">{totalCompanies.toLocaleString()}+</p>
                </div>
                <Building2 className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/40 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Job Categories</p>
                  <p className="text-2xl font-bold text-purple-400">{Object.keys(DASHBOARD_CONFIGS).length}+</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Category Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {(Object.entries(DASHBOARD_CONFIGS) as [JobCategory, DashboardConfig][]).map(([categoryId, cat]) => (
              <motion.button
                key={categoryId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(categoryId)
                  setSearchQuery('')
                }}
                className={`p-3 rounded-xl font-bold border-2 transition-all text-center ${
                  selectedCategory === categoryId
                    ? 'bg-lime-500/20 text-lime-400 border-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.5)]'
                    : 'bg-slate-700 text-gray-300 border-slate-600 hover:border-lime-500/50'
                }`}
              >
                <div className="text-2xl mb-1">{cat.categoryIcon}</div>
                <div className="text-xs">{cat.categoryName.split(' ')[0]}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Category Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={selectedCategory}
          className="space-y-6"
        >
          {/* Category Header */}
          <div className={`bg-gradient-to-br ${config.backgroundColor} border rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)]`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {config.categoryIcon} {config.categoryName}
                </h2>
                <p className="text-gray-400 mb-4">{config.industryInsights}</p>
                <p className="text-gray-500 text-sm">{jobsInCategory.length} job positions available</p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.metrics.map((metric) => (
              <CategoryMetricCard key={metric.id} metric={metric} category={selectedCategory} />
            ))}
          </div>

          {/* Tools & Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Tools */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <h3 className="text-lg font-bold text-white mb-3">🛠️ Quick Tools</h3>
              <div className="space-y-2">
                {config.tools.map((tool) => (
                  <Link key={tool.id} href={tool.action}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`w-full bg-gradient-to-br ${tool.color} text-white rounded-xl p-3 font-bold flex items-center justify-between group hover:shadow-lg transition-all`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{tool.icon}</span>
                        <div className="text-left">
                          <p className="text-sm font-bold">{tool.name}</p>
                          <p className="text-xs opacity-75">{tool.description}</p>
                        </div>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <h3 className="text-lg font-bold text-white mb-3">📚 Resources</h3>
              <div className="space-y-2">
                {config.resourceLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-700/50 hover:bg-slate-600/50 rounded-lg p-3 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          {link.title}
                        </span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-lime-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Listing */}
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">📋 Available Positions</h3>
              <div className="relative flex-1 max-w-xs ml-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search positions..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No positions found matching your search</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredJobs.map((job) => (
                  <JobPositionCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Metric Card Component
function CategoryMetricCard({
  metric,
  category
}: {
  metric: any
  category: JobCategory
}) {
  let value: string | number = 0

  const jobs = getJobsByCategory(category)

  if (metric.dataSource === 'total_positions') {
    value = jobs.reduce((sum, job) => sum + job.jobsAvailable, 0)
  } else if (metric.dataSource === 'average_salary') {
    const salary = getAverageSalaryRange(category)
    value = `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`
  } else if (metric.dataSource === 'growth_trend') {
    value = Math.round(jobs.reduce((sum, job) => sum + job.growthTrend, 0) / jobs.length)
  } else if (metric.dataSource === 'companies_hiring') {
    value = jobs.reduce((sum, job) => sum + job.companiesHiring, 0)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${metric.color} bg-gradient-to-br from-slate-800 to-gray-900 border rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{metric.icon}</span>
      </div>
      <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
      <p className={`text-2xl font-bold mb-1 ${metric.color.split(' ')[0]}`}>
        {typeof value === 'number' && metric.format === 'percentage' ? `${value}%` : value}
      </p>
      <p className="text-gray-500 text-xs">{metric.description}</p>
    </motion.div>
  )
}

// Job Position Card Component
function JobPositionCard({ job }: { job: any }) {
  const demandColor = {
    high: 'bg-red-500/20 text-red-400 border-red-500/40',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/40'
  }[job.demandLevel]

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 rounded-xl p-3 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm mb-1 group-hover:text-lime-400 transition-colors">{job.title}</h4>
          <p className="text-gray-500 text-xs mb-2">{job.subcategory}</p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded">
              <DollarSign className="w-3 h-3 inline mr-1" />
              ${job.avgSalary.min.toLocaleString()} - ${job.avgSalary.max.toLocaleString()}
            </span>
            <span className="text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded">
              <Users className="w-3 h-3 inline mr-1" />
              {job.jobsAvailable} openings
            </span>
            <span className={`text-xs border px-2 py-1 rounded ${demandColor}`}>
              {job.demandLevel === 'high' ? '🔴' : job.demandLevel === 'medium' ? '🟡' : '🟢'} {job.demandLevel.toUpperCase()} DEMAND
            </span>
          </div>

          <p className="text-gray-400 text-xs line-clamp-1 mb-1">{job.description}</p>
          
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400">+{job.growthTrend}% growth</span>
            <span className="text-gray-500">• {job.companiesHiring} companies hiring</span>
          </div>
        </div>

        <Link href={`/job/${job.id}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-500/20 hover:bg-lime-500/30 text-lime-400 border border-lime-500/40 rounded-lg p-2 transition-all flex-shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}
