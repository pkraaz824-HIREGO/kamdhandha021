# Component Documentation

## Overview
This document provides detailed information about all components in the HireGo platform.

## Authentication Components

### SignUp Component (`components/Auth/SignUp.tsx`)
**Location**: `/signup`
**Purpose**: User registration with email/phone verification

**Features**:
- Two-step registration (email/phone selection → OTP verification)
- Social login buttons (LinkedIn, Google)
- Contact method switcher (Email/Phone)
- OTP input field with resend option
- Motion animations with stagger effects

**Props**: None

**Key Animations**:
- Container stagger animation for step items
- Scale transforms on button hover
- Modal-like card appearance

### Login Component (`components/Auth/Login.tsx`)
**Location**: `/login`
**Purpose**: User authentication

**Features**:
- Email and password input fields
- Show/hide password toggle
- Social login options
- Remember me checkbox
- Forgot password link
- Sign-up redirect

**Props**: None

**Key Animations**:
- Initial scale animation on mount
- Password visibility toggle
- Button hover effects

## Navigation Components

### Navbar Component (`components/Navigation/Navbar.tsx`)
**Purpose**: Top navigation bar with user menu and notifications

**Features**:
- Logo with gradient background
- Desktop menu links
- Mobile hamburger menu with smooth animations
- Notification and message icons with badges
- Profile dropdown icon
- Responsive design

**Props**: None (appears on all pages)

**Key Elements**:
- Bell icon with red notification badge
- Profile initial circle
- Mobile menu toggle

## Landing Page Components

### Hero Component (`components/Landing/Hero.tsx`)
**Location**: `/` (home page)
**Purpose**: Main landing page hero section

**Features**:
- Large headline with gradient text
- Feature badge
- Call-to-action buttons
- Statistics cards
- Animated background blobs
- Animated card stack visualization

**Props**: None

**Key Animations**:
- Floating animation on card stack
- Rotating circles in background
- Staggered text animations
- Viewport-triggered animations

### Features Component (`components/Landing/Features.tsx`)
**Location**: `/` (home page)
**Purpose**: Display platform features in grid layout

**Features**:
- 6-feature grid (responsive: 1 col mobile, 3 cols desktop)
- Icons with gradient backgrounds
- Feature cards with hover effects
- Smooth viewport animations

**Features Displayed**:
1. Instant Matching (Zap icon)
2. Video Resumes (Video icon)
3. AI Screening (Brain icon)
4. Network Building (Users icon)
5. Smart Analytics (BarChart3 icon)
6. Security (Lock icon)

## Dashboard Components

### CandidateDashboard Component (`components/Dashboard/CandidateDashboard.tsx`)
**Location**: `/dashboard/candidate`
**Purpose**: Candidate profile overview and application tracking

**Features**:
- **Profile Stats Section**:
  - AI Fit Score with circular progress indicator
  - Profile completion % ring
  - Applications count
  - Shortlist count
  
- **Application Cards**:
  - Company logo/initial
  - Position and company name
  - Application status badge (applied/shortlisted/interviewing/offered)
  - Days since applied
  - AI Match Score with circular progress
  - View Details button
  - Status-colored progress bar at bottom

**Props**: None (uses mock data)

**Key Features**:
- Animated SVG circular progress rings
- Status-based color coding
- Staggered card animations
- Hover effects with elevation

### EmployerDashboard Component (`components/Dashboard/EmployerDashboard.tsx`)
**Location**: `/dashboard/employer`
**Purpose**: Job posting and candidate management for employers

**Features**:
- **Stat Cards**: Total applicants, AI matches/week, avg fit score, open positions
- **Job Listing Cards**:
  - Job title and company
  - Posted date with NEW badge
  - Applicants count
  - Shortlisted count
  - Average fit score
  - View Candidates button
  - Edit Job button
- **Job Creation Modal**: Form for posting new jobs with auto-generate button

**Props**: None (uses mock data)

**Key Features**:
- Modal for new job posting
- Animated stat cards
- Progress bar indicators
- Status badges

### AdminDashboard Component (`components/Dashboard/AdminDashboard.tsx`)
**Location**: `/dashboard/admin`
**Purpose**: Platform administration and analytics

**Features**:
- **Business Model Toggle**:
  - Current model display
  - Switch button
  - Model comparison cards
  - Confirmation modal
  
- **Analytics Cards**:
  - Total users
  - Total revenue
  - Active jobs
  
- **Detailed Metrics**:
  - Hiring activity (last 7 days)
  - User growth by category
  - Animated progress bars

**Props**: None

**Key Features**:
- Toggle confirmation modal with warnings
- Color-coded metric bars
- Growth indicators

## Job & Listing Components

### JobListings Component (`components/Jobs/JobListings.tsx`)
**Location**: `/jobs`
**Purpose**: Browse and apply to job postings

**Features**:
- **Filter Buttons**: All jobs, Featured jobs
- **Job Cards**:
  - Company initial box
  - Job title (2xl font, bold)
  - Company name (primary color)
  - Location, job type, posted date
  - Salary range (green color)
  - AI Match score with circular progress
  - Job description
  - Skill tags (clickable badges)
  - Applicant count
  - Save/Heart button (toggles between saved/unsaved)
  - Share button
  - Apply Now CTA
  - Animated bottom progress bar

**Props**: None (uses mock data)

**Key Features**:
- Job filtering by type
- Interactive save functionality
- Circular progress rings for match scores
- Status-colored badges

## Profile & Assessment Components

### VideoResume Component (`components/Profile/VideoResume.tsx`)
**Location**: `/profile/video-resume`
**Purpose**: Record or upload video resume

**Features**:
- **Video Preview Area**: Dark gradient background with video icon
- **Recording Controls**:
  - Start/Stop Recording button
  - Upload Video button
  - Recording timer display (current/max seconds)
  
- **Tips Section**: Blue-highlighted tips for recording
- **Success States**: Green checkmark and message after upload
- **Benefit Cards**: 3 cards showing benefits of video resumes

**Props**: None

**Key Features**:
- Recording state management
- Upload success state
- Animated timer during recording
- Pulse animation on video icon

### SkillAssessment Component (`components/Assessment/SkillAssessment.tsx`)
**Location**: `/assessment`
**Purpose**: Multi-question skill assessment

**Features**:
- **Question Types**:
  - MCQ (Multiple choice with 4 options)
  - Coding (Code editor with placeholder)
  - Situational (Text or video response)

- **Question Card**:
  - Question type badge (color-coded)
  - Question text (2xl font)
  - Time limit display
  - Appropriate input/answer section
  
- **Progress Bar**: Shows completion percentage
- **Navigation**: Previous/Next buttons
- **Submit**: Submit Assessment button on final question
- **Results Screen**: Success state with stats and return button

**Props**: None

**Key Features**:
- Time tracking per question
- Answer persistence
- Results page with stats

## Footer Component

### Footer Component (`components/Footer/Footer.tsx`)
**Purpose**: Site footer with links and newsletter

**Features**:
- **Brand Section**: Logo, description, social links
- **4-Column Link Sections**: Product, Company, Legal, Resources
- **Newsletter Signup**: Email input with subscribe button
- **Bottom Bar**: Copyright, additional links

**Props**: None (appears on all pages)

**Key Features**:
- Social media icon buttons with hover effects
- Newsletter subscription form
- Responsive grid layout

## Animation Patterns

### Standard Variants Pattern
All components use this pattern for consistent animations:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}
```

### Hover Effects
- Cards: `whileHover={{ y: -5 }}` or `whileHover={{ y: -10 }}`
- Buttons: `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.95 }}`
- Icons: `whileHover={{ scale: 1.1 }}`

### Progress Indicators (SVG)
```typescript
<motion.circle
  cx="30"
  cy="30"
  r="26"
  fill="none"
  stroke="#0ea5e9"
  strokeWidth="4"
  strokeDasharray="163.36"
  initial={{ strokeDashoffset: 163.36 }}
  animate={{ strokeDashoffset: 163.36 * (1 - score / 100) }}
  transition={{ duration: 1.5 }}
  strokeLinecap="round"
/>
```

## Color System

### Primary Colors
- `primary-50`: `#f0f9ff`
- `primary-500`: `#0ea5e9`
- `primary-600`: `#0284c7`
- `primary-700`: `#0369a1`

### Status Colors
- Success/Offered: Green (`text-green-600`, `bg-green-50`)
- Warning/Interviewing: Orange (`text-orange-700`, `bg-orange-50`)
- Info/Shortlisted: Purple (`text-purple-700`, `bg-purple-50`)
- Default/Applied: Blue (`text-blue-700`, `bg-blue-50`)

### Gradients
- Primary to Blue: `from-primary-500 to-blue-500`
- Dark gradient: `from-dark-900 via-slate-900 to-primary-900`

## Responsive Breakpoints
- Mobile: Default
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)
- XL: `xl:` (1280px)

## Icon Library
All icons from `lucide-react`:
- Navigation: Menu, X, ChevronRight
- Actions: Plus, Eye, Upload, Heart, Share2
- Status: CheckCircle, AlertCircle, Clock
- Professional: Briefcase, Users, Star, Award
- Communication: Mail, MessageSquare, Phone, Bell
- Analytics: BarChart3, TrendingUp
- Media: Video, Camera
- And many more...

## Styling Best Practices

1. **Card Styling**:
   ```tailwind
   bg-white rounded-2xl shadow-card border border-gray-100 p-8
   ```

2. **Button Styling**:
   ```tailwind
   px-6 py-3 rounded-xl font-bold transition-all
   bg-gradient-to-r from-primary-500 to-primary-600 text-white
   hover:shadow-card
   ```

3. **Badge Styling**:
   ```tailwind
   px-3 py-1 rounded-full text-xs font-bold
   bg-green-100 text-green-700
   ```

4. **Input Styling**:
   ```tailwind
   px-4 py-3 border-2 border-gray-200 rounded-xl
   focus:border-primary-500 focus:outline-none transition-colors
   ```

---

## Future Component Ideas

- [ ] Chat component
- [ ] Interview scheduler
- [ ] Payment/Billing component
- [ ] Settings/Preferences panel
- [ ] Notification center
- [ ] Message inbox
- [ ] Profile completion wizard
- [ ] AI-powered chat assistant

---

For component questions or additions, refer to the existing components as templates.
