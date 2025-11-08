# HireGo Setup & Development Guide

## Project Overview

HireGo is a modern Next.js-based platform that combines LinkedIn-style professional networking with AI-powered instant hiring capabilities. The application features beautiful UI/UX with animated circular progress indicators, card-based layouts, and smooth Framer Motion animations.

## ✅ Quick Start (Already Configured)

The project has been fully set up with all dependencies installed. To start developing:

```bash
npm run dev
```

Then visit: **http://localhost:3000**

## 📁 What's Been Created

### Core Configuration Files
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS customization with animations
- `postcss.config.js` - PostCSS configuration
- `next.config.js` - Next.js configuration
- `.gitignore` - Git ignore rules
- `app/globals.css` - Global styles and animations

### Pages Created

#### Authentication Pages
- `/` - Home/Landing page with features
- `/login` - User login page
- `/signup` - User sign-up with email/phone verification

#### Candidate Pages
- `/dashboard/candidate` - Candidate dashboard with AI Fit Score, profile completion, and applications
- `/jobs` - Job listings with AI matching and filtering
- `/profile/video-resume` - Video resume recording/upload
- `/assessment` - Skill assessments (MCQ, coding, situational)

#### Employer Pages
- `/dashboard/employer` - Job posting, candidate management, and analytics
- Uses modal for job creation and AI auto-generation

#### Admin Pages
- `/dashboard/admin` - Business model toggle (Pay-Per-Hire ↔ Subscription)
- Analytics dashboard with user growth and hiring metrics

### Components Structure

```
components/
├── Auth/
│   ├── SignUp.tsx        # Sign-up component
│   └── Login.tsx         # Login component
├── Navigation/
│   └── Navbar.tsx        # Top navigation bar
├── Landing/
│   ├── Hero.tsx          # Hero section with CTA
│   └── Features.tsx      # Features grid (6 items)
├── Dashboard/
│   ├── CandidateDashboard.tsx    # Candidate dashboard with circular progress
│   ├── EmployerDashboard.tsx     # Employer dashboard with job management
│   └── AdminDashboard.tsx        # Admin controls & analytics
├── Jobs/
│   └── JobListings.tsx   # Job cards with match scores
├── Assessment/
│   └── SkillAssessment.tsx       # Multi-question assessment
├── Profile/
│   └── VideoResume.tsx   # Video resume creation
└── Footer/
    └── Footer.tsx        # Footer with links and newsletter
```

## 🎨 Design Highlights

### Circular Progress Indicators
- SVG-based circular progress rings with smooth animations
- Used for AI Match Scores and profile completion
- `strokeDasharray` animation for smooth progress updates
- Located in: Dashboard components and Job cards

### Color System
- Primary Blue: `from-primary-500 to-primary-600`
- Gradients: `from-[color1] to-[color2]`
- Dark backgrounds: `from-dark-900 via-slate-900 to-primary-900`
- Responsive hover states with shadow transitions

### Animations
- Framer Motion for all interactive elements
- Scale transforms on hover
- Staggered children animations
- Smooth page transitions
- Pulse and float keyframe animations

## 🔄 Development Workflow

### Running the Dev Server
```bash
npm run dev
```
- Server runs on `http://localhost:3000`
- Hot reload enabled - changes update immediately
- TypeScript checking in real-time

### Building for Production
```bash
npm run build
npm run start
```

### Running Linter
```bash
npm run lint
```

## 📦 Dependencies

### Core
- `next@15.0.0` - React framework
- `react@19.0.0` - UI library
- `react-dom@19.0.0` - DOM renderer

### Styling & Animation
- `tailwindcss@3.3.5` - Utility CSS framework
- `framer-motion@10.16.4` - Animation library

### Icons & UI
- `lucide-react@0.263.1` - Icon library

### State Management
- `zustand@4.4.1` - Lightweight state manager (for future use)

### HTTP
- `axios@1.6.0` - HTTP client (for future API integration)

## 🗂️ File Organization Tips

### Adding New Pages
1. Create a folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` file
3. Create corresponding component in `components/`
4. Import component in the page

Example:
```typescript
// app/example/page.tsx
import ExampleComponent from '@/components/Example/ExampleComponent'

export default function ExamplePage() {
  return <ExampleComponent />
}
```

### Adding New Components
1. Create folder in `components/` by feature/section
2. Create component file with `.tsx` extension
3. Export as default
4. Use `'use client'` for interactive components

### Styling Guidelines
- Use Tailwind classes for styling
- Use `from-gradient to-color` for gradients
- Add `@apply` in `globals.css` for reusable patterns
- Use shadow-card and shadow-card-hover for depth

## 🎯 Feature Implementation Notes

### AI Fit Score Display
- Circular SVG progress indicator
- `strokeDasharray="339.29"` for full circle
- `strokeDashoffset` animates from `339.29 * (1 - score/100)`
- Located in: Dashboard components and Job cards

### Skill Assessment
Three question types:
1. **MCQ** - Multiple choice with option selection
2. **Coding** - Code editor with placeholder text
3. **Situational** - Text input or video recording option

### Business Model Toggle
- Admin can switch between Pay-Per-Hire and Subscription
- Shows confirmation modal with implications
- Updates all employer dashboards automatically

### Video Resume
- Start/stop recording buttons
- Upload from device option
- Progress counter (current/max seconds)
- Success state after upload

## 🔗 Routing Summary

| URL | Component | Type |
|-----|-----------|------|
| `/` | Hero + Features + Footer | Public |
| `/login` | Login form | Public |
| `/signup` | Sign-up with verification | Public |
| `/jobs` | Job listings with filters | Candidate |
| `/dashboard/candidate` | Profile & applications | Candidate |
| `/profile/video-resume` | Video recording/upload | Candidate |
| `/assessment` | Skill testing | Candidate |
| `/dashboard/employer` | Job management | Employer |
| `/dashboard/admin` | Admin controls | Admin |

## 🚀 Next Steps for Development

### Backend Integration
1. Set up API routes in `app/api/`
2. Replace mock data with real API calls
3. Integrate authentication (NextAuth.js)
4. Add database (PostgreSQL/MongoDB)

### Features to Build
- Real video upload (AWS S3/Cloudinary)
- Payment processing (Stripe)
- Email notifications
- Chat/Messaging system
- Interview scheduling
- Real AI matching algorithms

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization in production build

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Cache Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)

## 🎓 Code Style Guidelines

### Component Structure
```typescript
'use client'

import { motion } from 'framer-motion'
import { ComponentType } from 'lucide-react'

export default function MyComponent() {
  // Animation variants
  const containerVariants = { ... }
  const itemVariants = { ... }

  // Component logic
  
  // JSX return
  return (
    <motion.div variants={containerVariants}>
      {/* Content */}
    </motion.div>
  )
}
```

### Color Naming
- Use Tailwind's built-in color system
- Primary color: `primary-500`, `primary-600`
- Gradients: `from-primary-500 to-blue-500`
- Dark: `dark-50`, `dark-900`

## 💡 Pro Tips

1. **Use Tailwind's @apply for patterns**: Create reusable styles in `globals.css`
2. **Leverage Framer Motion variants**: Keep animations consistent with container/item pattern
3. **SVG animations**: Use `strokeDasharray` for progress indicators
4. **Responsive design**: Always test with Tailwind's `md:` prefix
5. **Dark mode ready**: Use gray-900 for dark backgrounds, gray-50 for light

---

**Happy coding! 🚀**
