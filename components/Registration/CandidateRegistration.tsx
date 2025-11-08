'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronRight, Upload, Mic, CheckCircle, AlertCircle, Globe, MapPin, Video, FileText } from 'lucide-react'
import { useState, useRef } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  nationality: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  timezone: string
  latitude?: string
  longitude?: string
  position: string
  education: string
  experience: string
  company: string
  linkedin: string
  portfolio: string
  skills: string
  languages: string
  resume: File | null
  coverLetter: string
  availability: string
  workAuth: string
  workPreference: string
  salary: string
  references?: string
  additionalInfo?: string
  introVideo?: File | null
}

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
  'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
  'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe',
]

const REGISTRATION_STEPS = [
  { id: 1, title: 'Personal Info', description: 'Your details' },
  { id: 2, title: 'Location', description: 'Where you are' },
  { id: 3, title: 'Professional', description: 'Your work' },
  { id: 4, title: 'Video Intro', description: '1-3 minutes' },
  { id: 5, title: 'AI Assessment', description: 'Skills evaluation' },
  { id: 6, title: 'Review', description: 'Finalize' },
]

export default function CandidateRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [videoQuestionIndex, setVideoQuestionIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '',
    address: '', city: '', state: '', zipCode: '', country: '', timezone: '',
    position: '', education: '', experience: '', company: '', linkedin: '', portfolio: '',
    skills: '', languages: '', resume: null, coverLetter: '', availability: '', workAuth: '',
    workPreference: '', salary: '', references: '', additionalInfo: '', introVideo: null,
    latitude: '', longitude: '',
  })

  const [countrySearch, setCountrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [videoUploaded, setVideoUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const videoQuestions = [
    { id: 1, question: "Tell us about yourself and why you're interested in this position", duration: "2-3 minutes" },
    { id: 2, question: "Explain how you would debug a performance issue in a React application", duration: "1-2 minutes" },
    { id: 3, question: "Walk us through your approach to solving a complex problem", duration: "2 minutes" },
  ]

  const handleVideoSubmit = () => {
    if (videoQuestionIndex < videoQuestions.length - 1) {
      setVideoQuestionIndex(videoQuestionIndex + 1)
    } else {
      // All video questions completed, move to next step
      setCurrentStep(currentStep + 1)
      setVideoQuestionIndex(0)
    }
  }

  const handleCountrySearch = (value: string) => {
    setCountrySearch(value)
    if (value.length > 0) {
      const filtered = COUNTRIES.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCountries(filtered)
      setShowCountryDropdown(true)
    } else {
      setShowCountryDropdown(false)
    }
  }

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, nationality: country }))
    setCountrySearch(country)
    setShowCountryDropdown(false)
  }

  const handleAutoFillLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData(prev => ({
            ...prev,
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
          }))
        },
        (error) => {
          console.log('Geolocation error:', error)
          alert('Could not get your location. Please enable location services.')
        }
      )
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'introVideo') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }))
      if (field === 'introVideo') {
        setVideoUploaded(true)
      }
    }
  }

  const nextStep = () => {
    if (currentStep < REGISTRATION_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Personal Information
        return (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">👤 Personal Information</h2>
              <p className="text-lime-400 text-sm">Tell us about yourself to get started</p>
            </div>

            {/* Name Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">👤 Name Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="John"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="Doe"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">📞 Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="+1 (555) 000-0000"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* DOB & Nationality Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🎂 Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nationality * (Search & Select)</label>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => handleCountrySearch(e.target.value)}
                    onFocus={() => setShowCountryDropdown(true)}
                    placeholder="Type country name..."
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                  />
                  {showCountryDropdown && filteredCountries.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border-2 border-lime-500/30 rounded-xl backdrop-blur-md shadow-2xl max-h-48 overflow-y-auto z-50"
                    >
                      {filteredCountries.slice(0, 8).map((country) => (
                        <motion.button
                          key={country}
                          whileHover={{ backgroundColor: 'rgba(132, 204, 22, 0.2)' }}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full text-left px-4 py-2 text-lime-200 transition-all hover:text-white font-medium"
                        >
                          {country}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                  {formData.nationality && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-lime-400 mt-1">
                      ✓ Selected: {formData.nationality}
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 2:
        // Location Information
        return (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">📍 Location Information</h2>
              <p className="text-lime-400 text-sm">Where are you located?</p>
            </div>

            {/* Auto-Fill Button */}
            <motion.div
              variants={itemVariants}
              className="px-6 py-4 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-bold flex items-center gap-2 hover:shadow-2xl transition-all shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.4)] transform hover:scale-105 cursor-pointer"
            >
              📍 Auto-Fill My Location
            </motion.div>

            {/* Address Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🏠 Street Address</h3>
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all hover:bg-gray-50"
                  placeholder="123 Main Street"
                />
              </motion.div>
            </motion.div>

            {/* City, State, Zip */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🏙️ City & Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="New York"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="NY"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="10001"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Country & Timezone */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🌍 Country & Timezone</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country} style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>{country}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Timezone *</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Timezone</option>
                    <option value="UTC-12:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC-12:00 - Baker Island</option>
                    <option value="UTC-05:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC-05:00 - Eastern Time</option>
                    <option value="UTC+00:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+00:00 - London</option>
                    <option value="UTC+01:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+01:00 - Paris, Berlin</option>
                    <option value="UTC+05:30" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+05:30 - India</option>
                    <option value="UTC+08:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+08:00 - Singapore</option>
                    <option value="UTC+09:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+09:00 - Tokyo</option>
                    <option value="UTC+12:00" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>UTC+12:00 - Auckland</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* GPS Coordinates */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">📡 GPS Coordinates (Auto-Filled)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    disabled
                    className="w-full px-4 py-3 bg-gray-900/50 border-2 border-lime-500/30 rounded-xl text-lime-400 focus:outline-none transition-all disabled:opacity-60 font-mono text-sm"
                    placeholder="Auto-filled"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    disabled
                    className="w-full px-4 py-3 bg-gray-900/50 border-2 border-lime-500/30 rounded-xl text-lime-400 focus:outline-none transition-all disabled:opacity-60 font-mono text-sm"
                    placeholder="Auto-filled"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 3:
        // Professional Information
        return (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">💼 Professional Information</h2>
              <p className="text-lime-400 text-sm">Tell us about your work experience</p>
            </div>

            {/* Position & Education */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🎯 Position & Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Position Applying For *</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Position</option>
                    <option value="developer" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Software Developer</option>
                    <option value="data-scientist" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Data Scientist</option>
                    <option value="business-analyst" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Business Analyst</option>
                    <option value="support" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Customer Support</option>
                    <option value="hr" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>HR Manager</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Highest Education *</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Education</option>
                    <option value="highschool" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>High School</option>
                    <option value="associate" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Associate Degree</option>
                    <option value="bachelor" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Bachelor's Degree</option>
                    <option value="master" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Master's Degree</option>
                    <option value="phd" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Doctorate/PhD</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Years of Experience *</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="5"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current/Last Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="Company Name"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Work History Links */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">🔗 Professional Links</h3>
              <div className="grid grid-cols-1 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Portfolio/Website</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="https://yourportfolio.com"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Skills & Languages */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">⚙️ Skills & Languages</h3>
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Key Skills * (comma-separated)</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all resize-none hover:bg-gray-800"
                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                    rows={2}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Languages Spoken *</label>
                  <textarea
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all resize-none hover:bg-gray-800"
                    placeholder="English (Fluent), Spanish (Intermediate)"
                    rows={2}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Work Preferences */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">💼 Work Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Availability *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Availability</option>
                    <option value="immediate" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Immediate</option>
                    <option value="2weeks" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>2 Weeks Notice</option>
                    <option value="1month" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>1 Month</option>
                    <option value="2months" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>2 Months</option>
                    <option value="3months" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>3+ Months</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Work Authorization *</label>
                  <select
                    name="workAuth"
                    value={formData.workAuth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Option</option>
                    <option value="citizen" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Citizen</option>
                    <option value="permanent" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Permanent Resident</option>
                    <option value="visa" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Work Visa</option>
                    <option value="sponsorship" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Need Sponsorship</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Remote Work Preference *</label>
                  <select
                    name="workPreference"
                    value={formData.workPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    style={{
                      colorScheme: 'dark',
                      color: 'white',
                    }}
                  >
                    <option value="" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Select Preference</option>
                    <option value="onsite" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>On-site Only</option>
                    <option value="hybrid" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Hybrid</option>
                    <option value="remote" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Fully Remote</option>
                    <option value="flexible" style={{ color: '#fff', backgroundColor: '#1a1a2e' }}>Flexible</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Expected Salary (Annual)</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all hover:bg-gray-800"
                    placeholder="$80,000 - $100,000"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-4">📄 Documents</h3>
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Resume/CV * (Upload)</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'resume')}
                    className="hidden"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 bg-gray-900/80 border-2 border-gray-600 border-dashed rounded-xl text-lime-400 focus:border-lime-400 focus:outline-none backdrop-blur-sm transition-all flex items-center justify-center gap-2 hover:bg-gray-800 hover:border-lime-500 shadow-[0_4px_12px_rgba(0,0,0,0.3)] cursor-pointer font-bold"
                  >
                    <Upload className="w-5 h-5" />
                    {formData.resume ? formData.resume.name : 'Click to upload Resume'}
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all resize-none hover:bg-gray-800"
                    placeholder="Tell us why you're interested in this position"
                    rows={3}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 4:
        // Video Introduction
        return (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">📹 Video Introduction</h2>
              <p className="text-lime-400 text-sm">Record a 1-3 minute video introducing yourself</p>
            </div>

            {/* Recording Tips at Top */}
            <motion.div variants={itemVariants} className="bg-lime-500/20 border-2 border-lime-500/40 rounded-xl p-4 shadow-lg">
              <p className="text-lime-200 font-semibold mb-2">💡 Recording Tips:</p>
              <ul className="text-lime-100 text-sm space-y-1">
                <li>✓ Speak clearly about your background and skills</li>
                <li>✓ Keep it natural and friendly (1-3 minutes)</li>
                <li>✓ Good lighting helps your video stand out</li>
                <li>✓ AI will evaluate: Communication, Knowledge, Experience</li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-gray-900 border border-slate-600 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(132,204,22,0.3)] transition-all duration-300"
            >
              <div className="aspect-video max-w-2xl mx-auto bg-gradient-to-br from-black/40 to-blue-900/20 rounded-xl flex items-center justify-center mb-4 border border-white/10">
                {videoUploaded ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-white font-bold text-lg">Video uploaded!</p>
                    <p className="text-gray-400 text-sm mt-2">{formData.introVideo?.name}</p>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <Video className="w-20 h-20 text-gray-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">Video preview will appear here</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold flex items-center gap-2 transition-all shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.4)]"
                >
                  <Mic className="w-5 h-5" />
                  Start Recording
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 text-white rounded-2xl font-extrabold hover:bg-gray-600 transition-all flex items-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(100,100,100,0.3)]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5" />
                  Upload Video
                </motion.button>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'introVideo')}
                  className="hidden"
                  ref={fileInputRef}
                  accept="video/*"
                />
              </div>
            </motion.div>
          </motion.div>
        )

      case 5:
        // Video Assessment - One question at a time
        const currentVideoQuestion = videoQuestions[videoQuestionIndex]
        return (
          <motion.div
            key={`video-${videoQuestionIndex}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🎥 Video Assessment</h2>
              <p className="text-lime-400 text-sm">Question {videoQuestionIndex + 1} of {videoQuestions.length}</p>
            </div>

            {/* Progress indicator for video questions */}
            <div className="flex gap-2 justify-center">
              {videoQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-16 rounded-full ${
                    index === videoQuestionIndex
                      ? 'bg-lime-500'
                      : index < videoQuestionIndex
                      ? 'bg-lime-600'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Single Video Question */}
            <motion.div variants={itemVariants} className="bg-gray-800 border-2 border-purple-500/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Video Question {videoQuestionIndex + 1}</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-2">{currentVideoQuestion.question}</p>
              <p className="text-gray-400 text-sm mb-6">Duration: {currentVideoQuestion.duration}</p>
              
              {/* Smaller centered video frame */}
              <div className="aspect-video mx-auto max-w-2xl bg-gradient-to-br from-black/60 to-purple-900/30 rounded-xl flex items-center justify-center mb-6 border-2 border-purple-500/40">
                <div className="text-center">
                  <Video className="w-20 h-20 text-gray-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">Your video will appear here</p>
                  <p className="text-gray-500 text-sm mt-2">Click "Start Recording" to begin</p>
                </div>
              </div>
              
              {/* Recording controls */}
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl font-extrabold text-lg flex items-center gap-3 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(239,68,68,0.5)] transform"
                >
                  <Mic className="w-6 h-6" />
                  Start Live Recording
                </motion.button>
                
                {/* Submit and Next button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoSubmit}
                  className="px-10 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold flex items-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)] transform"
                >
                  {videoQuestionIndex < videoQuestions.length - 1 ? (
                    <>
                      Submit & Next Question
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit & Continue
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Recording Tips */}
            <motion.div variants={itemVariants} className="bg-lime-500/20 border-2 border-lime-500/40 rounded-xl p-4 shadow-lg">
              <p className="text-lime-200 font-semibold mb-2">💡 Recording Tips:</p>
              <ul className="text-lime-100 text-sm space-y-1">
                <li>✓ Speak clearly and maintain eye contact with the camera</li>
                <li>✓ Keep your answer focused and within the time limit</li>
                <li>✓ Good lighting and quiet environment are essential</li>
                <li>✓ Take a moment to think before you start speaking</li>
              </ul>
            </motion.div>
          </motion.div>
        )

      case 6:
        // Text-based assessment questions
        return (
          <motion.div
            key="step5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🧠 Written Assessment</h2>
              <p className="text-lime-400 text-sm">Complete the following questions</p>
            </div>

            {/* Question 1: MCQ */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(34,197,94,0.4)] transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">Q1: Multiple Choice</h3>
              <p className="text-gray-300 mb-4">What is the primary benefit of using React hooks?</p>
              <div className="space-y-2">
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q1" className="mr-3" />
                  <span className="text-gray-300">A) Better performance</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q1" className="mr-3" />
                  <span className="text-gray-300">B) Reusable stateful logic</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q1" className="mr-3" />
                  <span className="text-gray-300">C) Smaller bundle size</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q1" className="mr-3" />
                  <span className="text-gray-300">D) Easier debugging</span>
                </label>
              </div>
            </motion.div>

            {/* Question 3: Text - Describe a project */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-gray-900 border border-blue-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.4)] transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">Q2: Text Response</h3>
              <p className="text-gray-300 mb-4">Describe a challenging project you worked on and how you overcame obstacles.</p>
              <textarea
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all resize-none hover:bg-gray-800"
                placeholder="Type your answer here..."
                rows={4}
              />
            </motion.div>

            {/* Question 3: Technical Text */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-gray-900 border border-orange-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.4)] transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">Q3: Technical Question</h3>
              <p className="text-gray-300 mb-4">Explain the difference between async/await and Promises in JavaScript.</p>
              <textarea
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-lime-500 focus:outline-none transition-all resize-none hover:bg-gray-800"
                placeholder="Type your answer here..."
                rows={4}
              />
            </motion.div>

            {/* Question 6: MCQ */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-gray-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(34,197,94,0.4)] transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">Q4: Multiple Choice</h3>
              <p className="text-gray-300 mb-4">Which HTTP method is typically used to update existing data?</p>
              <div className="space-y-2">
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q4" className="mr-3" />
                  <span className="text-gray-300">A) GET</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q4" className="mr-3" />
                  <span className="text-gray-300">B) POST</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q4" className="mr-3" />
                  <span className="text-gray-300">C) PUT</span>
                </label>
                <label className="flex items-center p-3 bg-gray-900 border-2 border-gray-600 rounded-xl hover:border-lime-500 cursor-pointer transition-all">
                  <input type="radio" name="q4" className="mr-3" />
                  <span className="text-gray-300">D) DELETE</span>
                </label>
              </div>
            </motion.div>

            {/* Submit Assessment Button */}
            <motion.div variants={itemVariants} className="flex justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold text-lg flex items-center gap-3 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)] transform"
              >
                <CheckCircle className="w-6 h-6" />
                Submit Assessment
              </motion.button>
            </motion.div>

            {/* AI Evaluation Info */}
            <motion.div variants={itemVariants} className="bg-lime-500/20 border-2 border-lime-500/40 rounded-xl p-4 shadow-lg">
              <p className="text-lime-200 font-semibold mb-3">🤖 AI Evaluation Criteria:</p>
              <ul className="text-lime-100 text-sm space-y-2">
                <li>✓ Communication Skills - Clarity & Confidence</li>
                <li>✓ Technical Knowledge - Relevant to {formData.position || 'your role'}</li>
                <li>✓ Experience - Work history & achievements</li>
                <li>✓ Problem Solving - Logical thinking</li>
              </ul>
            </motion.div>
          </motion.div>
        )

      case 7:
        return (
          <motion.div
            key="step6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">✅ Review & Submit</h2>
              <p className="text-lime-400 text-sm">Confirm your information before submission</p>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border border-slate-600 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-3"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300 font-medium">👤 Personal Information</span>
                <CheckCircle className="w-5 h-5 text-lime-400" />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300 font-medium">📍 Location Details</span>
                <CheckCircle className="w-5 h-5 text-lime-400" />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300 font-medium">💼 Professional Information</span>
                <CheckCircle className="w-5 h-5 text-lime-400" />
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300 font-medium">📹 Video Introduction</span>
                {videoUploaded ? (
                  <CheckCircle className="w-5 h-5 text-lime-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Ready for AI Assessment</span>
                <CheckCircle className="w-5 h-5 text-lime-400" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-lime-500/20 to-green-600/20 border-2 border-lime-500/40 rounded-2xl p-6 backdrop-blur-md shadow-lg"
            >
              <p className="text-lime-200 text-center font-semibold">
                ✅ All information complete! Your AI assessment will evaluate communication, knowledge, experience, and problem-solving skills.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-lime-500/20 border-2 border-lime-500/40 rounded-xl p-4 shadow-lg"
            >
              <p className="text-lime-200 font-semibold mb-2">📋 Next Steps:</p>
              <ul className="text-lime-100 text-sm space-y-1">
                <li>1. AI analyzes your video & assessment</li>
                <li>2. Dashboard shows visual metrics & insights</li>
                <li>3. System matches you with job roles</li>
                <li>4. Interview scheduling (HR → Technical → Operations)</li>
                <li>5. Virtual interview rounds with multiple interviewers</li>
              </ul>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8 relative">
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">🎯 HireGo Registration</h1>
          <p className="text-lime-400 text-lg"><span className="font-extrabold">Build your professional profile with AI</span></p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12">
          <div className="flex justify-between mb-8 overflow-x-auto">
            {REGISTRATION_STEPS.map((step) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center cursor-pointer flex-shrink-0 ${currentStep >= step.id ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                    currentStep === step.id
                      ? 'bg-lime-500 text-gray-900 shadow-lg'
                      : currentStep > step.id
                      ? 'bg-lime-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </motion.div>
                <p className={`text-xs font-medium text-center max-w-[60px] ${currentStep === step.id ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-lime-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / REGISTRATION_STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={`step-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-slate-800/95 to-gray-900/95 border border-slate-600 rounded-3xl p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-8 justify-between"
        >
          <motion.button
            whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8 py-3 rounded-2xl font-extrabold transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-600 text-white hover:bg-gray-700 backdrop-blur-sm shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(100,100,100,0.3)] transform hover:scale-105"
          >
            ← Previous
          </motion.button>

          {currentStep === REGISTRATION_STEPS.length ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard/candidate')}
              className="px-8 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold hover:shadow-lg transition-all flex items-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)] transform hover:scale-105"
            >
              <CheckCircle className="w-5 h-5" />
              Go to Dashboard
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-gray-900 rounded-2xl font-extrabold hover:shadow-lg transition-all flex items-center gap-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(132,204,22,0.5)] transform hover:scale-105"
            >
              Next →
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
