'use client'
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, UserPlus, UserMinus, UserCheck, Search, Filter, 
  Briefcase, MapPin, Star, TrendingUp, Network, CheckCircle,
  MessageSquare, Mail, MoreVertical, Building2, Award, Clock
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  title: string
  company: string
  location: string
  avatar: string
  coverImage?: string
  bio: string
  followers: number
  following: number
  connections: number
  isFollowing: boolean
  isConnected: boolean
  connectionStatus: 'none' | 'pending' | 'connected'
  skills: string[]
  mutualConnections: number
}

interface ConnectionRequest {
  id: string
  user: User
  message: string
  timestamp: Date
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Full Stack Developer',
    company: 'Google',
    location: 'San Francisco, CA',
    avatar: 'SJ',
    bio: 'Passionate about building scalable web applications. React & Node.js enthusiast.',
    followers: 2845,
    following: 543,
    connections: 892,
    isFollowing: false,
    isConnected: false,
    connectionStatus: 'none',
    skills: ['React', 'Node.js', 'TypeScript'],
    mutualConnections: 12
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'AI/ML Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    avatar: 'MC',
    bio: 'Building the future with AI. Deep Learning & Computer Vision specialist.',
    followers: 5234,
    following: 234,
    connections: 1523,
    isFollowing: true,
    isConnected: false,
    connectionStatus: 'pending',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    mutualConnections: 25
  },
  {
    id: '3',
    name: 'Emily Davis',
    title: 'Product Manager',
    company: 'Amazon',
    location: 'Seattle, WA',
    avatar: 'ED',
    bio: 'Product strategy & user experience. Leading innovative product teams.',
    followers: 3456,
    following: 678,
    connections: 1234,
    isFollowing: false,
    isConnected: true,
    connectionStatus: 'connected',
    skills: ['Product Strategy', 'Agile', 'UX Design'],
    mutualConnections: 8
  },
  {
    id: '4',
    name: 'James Wilson',
    title: 'DevOps Engineer',
    company: 'Netflix',
    location: 'Los Angeles, CA',
    avatar: 'JW',
    bio: 'Cloud architecture & automation. AWS & Kubernetes expert.',
    followers: 1876,
    following: 432,
    connections: 654,
    isFollowing: true,
    isConnected: true,
    connectionStatus: 'connected',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    mutualConnections: 15
  },
]

export default function NetworkingHub() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [activeTab, setActiveTab] = useState<'discover' | 'connections' | 'followers' | 'following'>('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [connectionMessage, setConnectionMessage] = useState('')

  const handleFollow = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing, followers: user.isFollowing ? user.followers - 1 : user.followers + 1 }
        : user
    ))
  }

  const handleConnect = (user: User) => {
    setSelectedUser(user)
    setShowConnectionModal(true)
  }

  const handleSendConnectionRequest = () => {
    if (selectedUser && connectionMessage.trim()) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, connectionStatus: 'pending' }
          : user
      ))
      setShowConnectionModal(false)
      setConnectionMessage('')
      setSelectedUser(null)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === 'connections') return user.connectionStatus === 'connected' && matchesSearch
    if (activeTab === 'followers') return user.isFollowing && matchesSearch
    if (activeTab === 'following') return user.isFollowing && matchesSearch
    return matchesSearch
  })

  const getConnectionButtonStyle = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-400 border-green-500/40 hover:bg-green-500/30'
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40 hover:bg-orange-500/30'
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40 hover:bg-blue-500/30'
    }
  }

  const stats = {
    connections: users.filter(u => u.connectionStatus === 'connected').length,
    followers: users.filter(u => u.isFollowing).length,
    following: users.filter(u => u.isFollowing).length,
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
          <h1 className="text-4xl font-bold text-white mb-2">🌐 Professional Network</h1>
          <p className="text-gray-400">Grow your professional connections and opportunities</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-blue-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between mb-2">
              <Network className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">{stats.connections}</span>
            </div>
            <p className="text-gray-300 font-medium">Connections</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-purple-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-purple-400">{stats.followers}</span>
            </div>
            <p className="text-gray-300 font-medium">Followers</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-green-400">{stats.following}</span>
            </div>
            <p className="text-gray-300 font-medium">Following</p>
          </div>
        </motion.div>

        {/* Search & Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, title, or company..."
                className="w-full pl-12 pr-4 py-4 bg-slate-900 border-2 border-slate-600 rounded-2xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            {(['discover', 'connections', 'followers', 'following'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 shadow-[0_8px_16px_rgba(132,204,22,0.5)]'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

              {/* Profile Content */}
              <div className="p-6 -mt-12">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lime-500 to-green-600 border-4 border-slate-800 flex items-center justify-center text-gray-900 font-bold text-2xl mb-4 shadow-xl">
                  {user.avatar}
                </div>

                {/* User Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{user.title}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>{user.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{user.bio}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/40">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{user.connections}</p>
                    <p className="text-xs text-gray-500">Connections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{user.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{user.following}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>

                {/* Mutual Connections */}
                {user.mutualConnections > 0 && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <Users className="w-4 h-4" />
                    <span>{user.mutualConnections} mutual connections</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {user.connectionStatus !== 'connected' ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConnect(user)}
                      disabled={user.connectionStatus === 'pending'}
                      className={`flex-1 px-4 py-3 rounded-2xl font-bold border-2 flex items-center justify-center gap-2 transition-all ${getConnectionButtonStyle(user.connectionStatus)}`}
                    >
                      {user.connectionStatus === 'pending' ? (
                        <>
                          <Clock className="w-4 h-4" />
                          Pending
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Connect
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-3 bg-green-500/20 text-green-400 rounded-2xl font-bold border-2 border-green-500/40 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Connected
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFollow(user.id)}
                    className={`flex-1 px-4 py-3 rounded-2xl font-bold border-2 flex items-center justify-center gap-2 transition-all ${
                      user.isFollowing
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30'
                        : 'bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600'
                    }`}
                  >
                    {user.isFollowing ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-slate-700 text-white rounded-2xl hover:bg-slate-600 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No users found</p>
          </div>
        )}

        {/* Connection Request Modal */}
        {showConnectionModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConnectionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-gray-900 font-bold text-xl">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedUser.title}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Add a note (optional)</label>
                <textarea
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder={`Hi ${selectedUser.name.split(' ')[0]}, I'd like to connect with you...`}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendConnectionRequest}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-xl font-bold shadow-lg"
                >
                  Send Request
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConnectionModal(false)}
                  className="px-6 py-3 bg-slate-700 text-white rounded-xl font-bold"
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
