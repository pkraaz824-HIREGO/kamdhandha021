# HireGo - Next LinkedIn 2.0 with AI-Powered Hiring

A modern, full-featured professional networking and instant hiring platform combining LinkedIn's powerful networking with cutting-edge AI recruitment technology.

## 🚀 Features

### For Candidates
- **Smart Profile System**: AI-powered profile completion with auto-filling from resumes
- **Video Resume**: Record or upload personalized video introductions (30-90 seconds)
- **AI Fit Score**: Get an instant compatibility score based on your profile strength
- **Job Matching**: Discover roles perfectly matched to your skills and experience
- **Skill Assessment**: Take quick skill-building quizzes and coding challenges
- **Application Tracking**: Monitor all applications with real-time status updates
- **AI-Ranked Opportunities**: See jobs ranked by how well they match your profile

### For Employers
- **AI Job Description Generator**: Auto-generate professional job descriptions instantly
- **Smart Candidate Delivery**: Get pre-screened, AI-matched candidates within 30 minutes
- **AI Screening & Rating**: Automatic evaluation of candidate soft skills and communication
- **Two Business Models**:
  - **Pay-Per-Hire**: Pay only when you hire a candidate
  - **Subscription**: Unlimited job postings with monthly/yearly plans
- **Real-time Analytics**: Track hiring metrics, candidate pipeline, and team performance
- **Video Resume Viewer**: See candidate introductions and communication skills firsthand

### For Admin
- **Business Model Control**: Switch between Pay-Per-Hire and Subscription models globally
- **Platform Analytics**: Monitor users, revenue, hiring activity, and growth metrics
- **User Management**: Approve, verify, and manage all platform users
- **Payment Tracking**: Monitor subscription revenue and per-hire invoices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **HTTP Client**: Axios

## 📦 Project Structure

```
hirego/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with navbar
│   ├── login/                   # Login page
│   ├── signup/                  # Sign up page
│   ├── jobs/                    # Job listings
│   ├── assessment/              # Skill assessments
│   ├── profile/
│   │   └── video-resume/        # Video resume creation
│   └── dashboard/
│       ├── candidate/           # Candidate dashboard
│       ├── employer/            # Employer dashboard
│       └── admin/               # Admin dashboard
├── components/                   # Reusable components
│   ├── Auth/                    # Login & Sign up
│   ├── Navigation/              # Navbar
│   ├── Landing/                 # Hero & Features
│   ├── Dashboard/               # Dashboard components
│   ├── Jobs/                    # Job listing components
│   ├── Assessment/              # Assessment components
│   ├── Profile/                 # Profile components
│   └── Footer/                  # Footer component
├── app/globals.css              # Global styles
└── tailwind.config.ts           # Tailwind configuration
```

## 🎯 Key Pages

### Public Pages
- **Home** (`/`) - Hero section with features overview
- **Login** (`/login`) - User authentication
- **Sign Up** (`/signup`) - Registration with email/phone verification
- **Jobs** (`/jobs`) - Browse and apply to job postings

### Candidate Pages
- **Candidate Dashboard** (`/dashboard/candidate`) - Profile overview with AI Fit Score
- **Video Resume** (`/profile/video-resume`) - Record or upload video introduction
- **Skill Assessment** (`/assessment`) - Take skill-building assessments

### Employer Pages
- **Employer Dashboard** (`/dashboard/employer`) - Post jobs and manage candidates
- **Auto-Generate Job Descriptions** - One-click job posting
- **View Candidates** - Browse AI-screened candidates with match scores

### Admin Pages
- **Admin Dashboard** (`/dashboard/admin`) - Control platform settings and view analytics
- **Business Model Toggle** - Switch between Pay-Per-Hire and Subscription models

## 🎨 Design Features

### Beautiful UI/UX
- **Circular Progress Rings**: Animated SVG circular progress indicators for match scores
- **Card-Based Layout**: Clean, modern card design with smooth hover effects
- **Gradient Backgrounds**: Eye-catching gradient colors throughout the app
- **Running Line Animations**: SVG line animations that flow around circular designs
- **Smooth Transitions**: Framer Motion animations for all interactions
- **Dark Mode Ready**: Scalable color system that can support dark mode

### Interactive Components
- Animated counters and progress bars
- Smooth page transitions
- Hover effects with depth and shadow
- Loading states and animations
- Modal dialogs with backdrop blur
- Toast-like notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
cd hirego
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm run start
```

## 📋 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home/Landing page |
| `/login` | User login |
| `/signup` | User registration |
| `/jobs` | Job listings |
| `/assessment` | Skill assessments |
| `/profile/video-resume` | Video resume creation |
| `/dashboard/candidate` | Candidate dashboard |
| `/dashboard/employer` | Employer dashboard |
| `/dashboard/admin` | Admin panel |

## 🎯 Next Steps / Future Enhancements

- [ ] Backend API integration (Node.js/Python)
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] User authentication system (NextAuth)
- [ ] Video upload & streaming (AWS S3)
- [ ] Real AI model integration for matching
- [ ] Email notifications
- [ ] Chat/Messaging system
- [ ] Interview scheduling
- [ ] Payment integration (Stripe)
- [ ] Dark mode support
- [ ] Mobile app (React Native)

## 💡 Key Features Implementation Notes

### AI Fit Score Calculation
The circular progress indicator displays candidate match scores with smooth animations. The implementation uses SVG circles with stroke-dasharray for smooth progress animations.

### Video Resume
Candidates can record up to 90-second video introductions using their webcam or upload pre-recorded videos. Videos are displayed in the profile and during employer reviews.

### Skill Assessment
Multi-question assessment system with:
- Multiple choice questions
- Coding challenges
- Situational responses
- Time-based evaluation

### Business Model Toggle
Admin can switch between two business models:
- **Pay-Per-Hire**: Employers pay per successful hire
- **Subscription**: Employers pay monthly/yearly for unlimited posts

## 🔒 Security Considerations

- HTTPS only in production
- CSRF protection
- XSS prevention with React's built-in escaping
- Input validation on all forms
- Secure password handling
- OAuth2 for third-party integrations

## 📱 Responsive Design

- Mobile-first approach
- Tailwind's responsive classes
- Optimized for all screen sizes
- Touch-friendly interface

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.

## 📄 License

This project is proprietary and all rights are reserved.

---

**Built with ❤️ for the future of hiring**
