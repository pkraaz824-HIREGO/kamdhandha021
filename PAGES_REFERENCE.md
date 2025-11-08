# Pages Reference Guide

## Quick Navigation Map

This guide shows all available pages in the HireGo platform and their key features.

---

## 🏠 Public Pages

### Home Page
**URL**: `/`
**File**: `app/page.tsx`
**Components**: 
- Hero section with headline and CTAs
- Features grid (6 items)
- Footer

**Key Features**:
- Animated hero with gradient text
- Feature cards with hover effects
- Newsletter signup in footer
- Responsive design

**What You'll See**:
- "Hire Top Talent in 30 Minutes" headline
- Get Started & Watch Demo buttons
- Statistics (50K+ Candidates, 2K+ Companies, 500+ Hires/Week)
- 6 feature cards (Instant Matching, Video Resumes, AI Screening, etc.)

---

### Login Page
**URL**: `/login`
**File**: `app/login/page.tsx`
**Component**: `components/Auth/Login.tsx`

**Key Features**:
- Email & password input
- Social login (LinkedIn, Google)
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Sign up link

**What You'll See**:
- HireGo logo and branding
- "Welcome Back" headline
- Social login buttons
- Email/password form
- Links for password reset and sign up

---

### Sign Up Page
**URL**: `/signup`
**File**: `app/signup/page.tsx`
**Component**: `components/Auth/SignUp.tsx`

**Key Features**:
- Two-step registration
- Contact method selector (Email/Phone)
- Social login options
- OTP verification
- Email/Phone input
- Resend code option

**What You'll See**:
- Step 1: Select email or phone
- Step 2: Enter verification code
- Social login buttons
- Progress through registration steps

---

### Job Listings Page
**URL**: `/jobs`
**File**: `app/jobs/page.tsx`
**Component**: `components/Jobs/JobListings.tsx`

**Key Features**:
- Job filtering (All / Featured)
- Job cards with:
  - Company information
  - Job title and salary range
  - Your AI Match score (circular progress)
  - Skill tags
  - Save/Share/Apply buttons
- Applicant count

**What You'll See**:
- Filter buttons (All Jobs, Featured)
- Job cards with company logos
- Salary ranges in green
- Match scores with circular progress rings
- Applicant counts
- Save/Share/Apply action buttons

---

## 👤 Candidate Pages

### Candidate Dashboard
**URL**: `/dashboard/candidate`
**File**: `app/dashboard/candidate/page.tsx`
**Component**: `components/Dashboard/CandidateDashboard.tsx`

**Key Features**:
- **Profile Stats**:
  - AI Fit Score (circular progress ring)
  - Profile completion % (circular progress ring)
  - Applications count
  - Shortlisted count

- **Application Cards**:
  - Company info and position
  - Application status (Applied/Shortlisted/Interviewing/Offered)
  - AI Match Score (circular progress)
  - Time since applied
  - View Details button

**What You'll See**:
- 4 stat boxes with animated circular progress
- List of job applications with status badges
- Color-coded status indicators
- Match scores displayed as circular percentages
- Animated progress bars at bottom of cards

---

### Video Resume Page
**URL**: `/profile/video-resume`
**File**: `app/profile/video-resume/page.tsx`
**Component**: `components/Profile/VideoResume.tsx`

**Key Features**:
- Video preview area (dark gradient background)
- Start/Stop recording button
- Upload video button
- Recording timer (current/max seconds)
- Tips section (blue highlighted)
- Success state with checkmark
- Benefit cards (3 benefits of video)

**What You'll See**:
- Large video preview area
- Recording controls
- Live recording timer
- Blue tips box with recording advice
- Green success message after upload
- 3 benefit cards below (Higher Match Rate, Stand Out, Faster Hiring)

---

### Skill Assessment Page
**URL**: `/assessment`
**File**: `app/assessment/page.tsx`
**Component**: `components/Assessment/SkillAssessment.tsx`

**Key Features**:
- Multi-question assessment with 3 question types:
  - **MCQ**: Multiple choice (4 options)
  - **Coding**: Code editor format
  - **Situational**: Text/video response
- Progress bar showing completion
- Navigation buttons (Previous/Next)
- Time limit display per question
- Results page with stats

**What You'll See**:
- Question type badge (color-coded)
- Question text (large font)
- Appropriate input type for question
- Previous/Next navigation
- Progress bar at top
- Results page with completion stats

---

## 💼 Employer Pages

### Employer Dashboard
**URL**: `/dashboard/employer`
**File**: `app/dashboard/employer/page.tsx`
**Component**: `components/Dashboard/EmployerDashboard.tsx`

**Key Features**:
- **Stat Cards**: (4 metrics)
  - Total Applicants (200+)
  - AI Matches/Week (45)
  - Avg Fit Score (87%)
  - Open Positions (3)

- **Job Postings List**:
  - Job title and company
  - Posted date
  - NEW badge for recent posts
  - Applicants count
  - Shortlisted count
  - Average fit score
  - View Candidates button
  - Edit Job button

- **Post New Job Button**: Opens modal form
- **Auto-Generate Job Description**: AI-powered JD creation

**What You'll See**:
- 4 stat cards at top with gradient backgrounds
- Active job postings listed below
- NEW badges on recent jobs
- Metrics for each job (applicants, shortlisted, avg fit score)
- Post New Job button
- Modal form for creating jobs

---

## ⚙️ Admin Pages

### Admin Dashboard
**URL**: `/dashboard/admin`
**File**: `app/dashboard/admin/page.tsx`
**Component**: `components/Dashboard/AdminDashboard.tsx`

**Key Features**:
- **Business Model Toggle**:
  - Current model display
  - Switch button
  - Model comparison cards (subscription vs pay-per-hire)
  - Confirmation modal

- **Analytics Cards** (3 metrics):
  - Total Users
  - Total Revenue
  - Active Jobs

- **Detailed Metrics**:
  - Hiring Activity (last 7 days)
  - User Growth (by category)
  - Animated progress bars

**What You'll See**:
- Business model section with toggle button
- Comparison cards for both models
- 3 main stat cards
- Hiring activity metrics with bar charts
- User growth by category
- Confirmation modal when switching models

---

## 🔗 Complete URL Reference

| Page | URL | Role |
|------|-----|------|
| Home | `/` | Public |
| Login | `/login` | Public |
| Sign Up | `/signup` | Public |
| Job Listings | `/jobs` | Candidate |
| Candidate Dashboard | `/dashboard/candidate` | Candidate |
| Video Resume | `/profile/video-resume` | Candidate |
| Skill Assessment | `/assessment` | Candidate |
| Employer Dashboard | `/dashboard/employer` | Employer |
| Admin Dashboard | `/dashboard/admin` | Admin |

---

## 🎨 Design Features Across Pages

### Consistent Elements
- **Navbar**: Appears on all pages (logo, menu, notifications, profile)
- **Footer**: Appears on public pages (links, newsletter, social)
- **Color Scheme**: Primary blue with gradients
- **Animations**: Framer Motion throughout
- **Responsiveness**: Mobile-first design

### Circular Progress Indicators
Found on:
- Candidate Dashboard (AI Fit Score, Profile Completion)
- Job Cards (AI Match Score)
- Job Details (Match Score)

### Status Badges
Colors by status:
- **Applied**: Blue
- **Shortlisted**: Purple
- **Interviewing**: Orange
- **Offered**: Green

### Card Layouts
- White background
- Border: `border-gray-100`
- Shadow: `shadow-card`
- Rounded: `rounded-xl` or `rounded-2xl`
- Padding: `p-6` or `p-8`

---

## 🚀 Features by User Type

### Candidates Can:
- ✅ Sign up and create profile
- ✅ Upload/record video resume
- ✅ Browse job listings
- ✅ Apply to jobs
- ✅ Track applications
- ✅ View AI Fit Score
- ✅ Take skill assessments
- ✅ View job details with match scores

### Employers Can:
- ✅ Sign up and verify company
- ✅ Post jobs manually
- ✅ Auto-generate job descriptions
- ✅ View AI-matched candidates
- ✅ See candidate videos
- ✅ View hiring analytics
- ✅ Switch business models (from Admin)

### Admins Can:
- ✅ Toggle business model (Pay-Per-Hire ↔ Subscription)
- ✅ View platform analytics
- ✅ Monitor user growth
- ✅ Track hiring activity
- ✅ View revenue metrics

---

## 📱 Mobile Responsiveness

All pages are fully responsive:
- **Mobile**: Single column layout
- **Tablet** (`md:`): 2-column layout where applicable
- **Desktop** (`lg:`+): Full multi-column grid

Examples:
- Job cards stack on mobile, arrange in grid on desktop
- Dashboard stats take full width on mobile, 2-4 columns on desktop
- Modals adapt to screen size

---

## 🔄 Navigation Flow

```
Home Page (/)
├── [Get Started] → Sign Up (/signup)
│   └── [Sign In] → Login (/login)
│       └── [After Auth]
│           ├── Dashboard (/dashboard/candidate or /dashboard/employer)
│           ├── Jobs (/jobs)
│           ├── Video Resume (/profile/video-resume)
│           └── Assessment (/assessment)
│
└── [Watch Demo / Learn More]
    └── Features section on home page
```

---

## 📊 Mock Data Included

All pages use realistic mock data:
- **Jobs**: 3 job listings with real salaries, companies, match scores
- **Applications**: 4 application entries with various statuses
- **Stats**: Realistic numbers for users, revenue, hiring activity
- **Metrics**: Hiring activity data, user growth charts

---

## 🎯 Next Steps

1. **Browse all pages** by visiting the URLs
2. **Test interactions** - hover effects, click buttons, animations
3. **Check responsiveness** - resize browser window
4. **Review code** - components and styling
5. **Plan backend integration** - API routes and database

---

For detailed component information, see `COMPONENT_DOCS.md`
For setup instructions, see `SETUP_GUIDE.md`
