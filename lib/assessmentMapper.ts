// Assessment Type Definitions
export type AssessmentType = 'video' | 'written' | 'coding' | 'case-study' | 'communication' | 'technical' | 'behavioral'

export interface AssessmentResult {
  assessmentId: string
  type: AssessmentType
  score: number // 0-100
  feedback: string
  timestamp: Date
  category: string
}

export interface ProfileType {
  id: string
  name: string // 'Frontend Developer', 'Backend Developer', 'Product Manager', etc.
  category: string // 'technical', 'management', 'creative', 'hybrid'
  requiredAssessments: AssessmentType[]
  skillMappings: SkillMapping[]
  weightage: WeightageConfig
}

export interface SkillMapping {
  skillName: string
  skillCategory: 'technical' | 'communication' | 'confidence'
  assessmentTypes: AssessmentType[]
  weightage: number // 0-1
  minRequired: number // Minimum score needed (0-100)
}

export interface WeightageConfig {
  technical: number // 0-1
  communication: number // 0-1
  confidence: number // 0-1
}

export interface GeneratedSkillProfile {
  skillName: string
  category: 'technical' | 'communication' | 'confidence'
  proficiency: number // Calculated from assessments
  required: number
  evidence: AssessmentResult[] // Source assessments
  proficiencySource: string[] // Which assessments contributed
}

export interface AssessmentReport {
  profileType: string
  candidateId: string
  generatedAt: Date
  overallScore: number
  skills: GeneratedSkillProfile[]
  gaps: SkillGap[]
  strengths: SkillGap[]
  recommendations: Recommendation[]
  assessmentsConducted: AssessmentResult[]
}

export interface SkillGap {
  skill: string
  current: number
  required: number
  gap: number
}

export interface Recommendation {
  type: 'strength' | 'improvement' | 'development'
  skill: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

// Profile Type Definitions - Expandable System
export const PROFILE_TYPES: Record<string, ProfileType> = {
  frontend_developer: {
    id: 'frontend_developer',
    name: 'Frontend Developer',
    category: 'technical',
    requiredAssessments: ['coding', 'communication', 'case-study'],
    skillMappings: [
      {
        skillName: 'React/Vue/Angular',
        skillCategory: 'technical',
        assessmentTypes: ['coding', 'case-study'],
        weightage: 0.25,
        minRequired: 80
      },
      {
        skillName: 'CSS/Styling',
        skillCategory: 'technical',
        assessmentTypes: ['coding'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'JavaScript/TypeScript',
        skillCategory: 'technical',
        assessmentTypes: ['coding', 'technical'],
        weightage: 0.25,
        minRequired: 85
      },
      {
        skillName: 'UI/UX Understanding',
        skillCategory: 'technical',
        assessmentTypes: ['case-study', 'behavioral'],
        weightage: 0.15,
        minRequired: 70
      },
      {
        skillName: 'Communication',
        skillCategory: 'communication',
        assessmentTypes: ['communication', 'case-study'],
        weightage: 0.10,
        minRequired: 70
      },
      {
        skillName: 'Problem Solving',
        skillCategory: 'confidence',
        assessmentTypes: ['coding', 'case-study'],
        weightage: 0.10,
        minRequired: 75
      }
    ],
    weightage: { technical: 0.80, communication: 0.10, confidence: 0.10 }
  },
  
  backend_developer: {
    id: 'backend_developer',
    name: 'Backend Developer',
    category: 'technical',
    requiredAssessments: ['coding', 'technical', 'case-study'],
    skillMappings: [
      {
        skillName: 'Database Design',
        skillCategory: 'technical',
        assessmentTypes: ['coding', 'technical', 'case-study'],
        weightage: 0.25,
        minRequired: 85
      },
      {
        skillName: 'API Design',
        skillCategory: 'technical',
        assessmentTypes: ['coding', 'case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'Server Architecture',
        skillCategory: 'technical',
        assessmentTypes: ['technical', 'case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'System Design',
        skillCategory: 'technical',
        assessmentTypes: ['case-study', 'technical'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'Problem Analysis',
        skillCategory: 'confidence',
        assessmentTypes: ['coding', 'case-study'],
        weightage: 0.10,
        minRequired: 75
      },
      {
        skillName: 'Technical Communication',
        skillCategory: 'communication',
        assessmentTypes: ['communication'],
        weightage: 0.10,
        minRequired: 70
      }
    ],
    weightage: { technical: 0.80, communication: 0.10, confidence: 0.10 }
  },

  product_manager: {
    id: 'product_manager',
    name: 'Product Manager',
    category: 'management',
    requiredAssessments: ['case-study', 'communication', 'behavioral'],
    skillMappings: [
      {
        skillName: 'Product Strategy',
        skillCategory: 'technical',
        assessmentTypes: ['case-study', 'behavioral'],
        weightage: 0.25,
        minRequired: 80
      },
      {
        skillName: 'User Research',
        skillCategory: 'technical',
        assessmentTypes: ['case-study'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'Communication Skills',
        skillCategory: 'communication',
        assessmentTypes: ['communication', 'case-study', 'behavioral'],
        weightage: 0.25,
        minRequired: 85
      },
      {
        skillName: 'Stakeholder Management',
        skillCategory: 'communication',
        assessmentTypes: ['behavioral', 'communication'],
        weightage: 0.15,
        minRequired: 80
      },
      {
        skillName: 'Decision Making',
        skillCategory: 'confidence',
        assessmentTypes: ['case-study', 'behavioral'],
        weightage: 0.10,
        minRequired: 75
      },
      {
        skillName: 'Leadership',
        skillCategory: 'confidence',
        assessmentTypes: ['behavioral'],
        weightage: 0.10,
        minRequired: 75
      }
    ],
    weightage: { technical: 0.40, communication: 0.40, confidence: 0.20 }
  },

  data_scientist: {
    id: 'data_scientist',
    name: 'Data Scientist',
    category: 'technical',
    requiredAssessments: ['coding', 'technical', 'case-study'],
    skillMappings: [
      {
        skillName: 'Machine Learning',
        skillCategory: 'technical',
        assessmentTypes: ['coding', 'technical'],
        weightage: 0.30,
        minRequired: 85
      },
      {
        skillName: 'Statistical Analysis',
        skillCategory: 'technical',
        assessmentTypes: ['technical', 'case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'Data Visualization',
        skillCategory: 'technical',
        assessmentTypes: ['case-study'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'Python/R Programming',
        skillCategory: 'technical',
        assessmentTypes: ['coding'],
        weightage: 0.20,
        minRequired: 85
      },
      {
        skillName: 'Problem Analysis',
        skillCategory: 'confidence',
        assessmentTypes: ['case-study', 'coding'],
        weightage: 0.10,
        minRequired: 75
      },
      {
        skillName: 'Communication',
        skillCategory: 'communication',
        assessmentTypes: ['case-study'],
        weightage: 0.05,
        minRequired: 70
      }
    ],
    weightage: { technical: 0.85, communication: 0.05, confidence: 0.10 }
  },

  ux_designer: {
    id: 'ux_designer',
    name: 'UX Designer',
    category: 'creative',
    requiredAssessments: ['case-study', 'communication', 'behavioral'],
    skillMappings: [
      {
        skillName: 'User Research',
        skillCategory: 'technical',
        assessmentTypes: ['case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'Wireframing/Prototyping',
        skillCategory: 'technical',
        assessmentTypes: ['case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'Design Thinking',
        skillCategory: 'technical',
        assessmentTypes: ['case-study', 'behavioral'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'Communication',
        skillCategory: 'communication',
        assessmentTypes: ['communication', 'case-study'],
        weightage: 0.20,
        minRequired: 80
      },
      {
        skillName: 'Creativity',
        skillCategory: 'confidence',
        assessmentTypes: ['case-study', 'behavioral'],
        weightage: 0.15,
        minRequired: 75
      },
      {
        skillName: 'Attention to Detail',
        skillCategory: 'confidence',
        assessmentTypes: ['case-study'],
        weightage: 0.10,
        minRequired: 75
      }
    ],
    weightage: { technical: 0.55, communication: 0.20, confidence: 0.25 }
  }
}

// Core Assessment Mapper Logic
export class AssessmentMapper {
  static getProfileType(profileId: string): ProfileType | null {
    return PROFILE_TYPES[profileId] || null
  }

  static generateSkillProfile(
    assessmentResults: AssessmentResult[],
    profileType: ProfileType
  ): GeneratedSkillProfile[] {
    const skillProfiles: GeneratedSkillProfile[] = []

    for (const skillMapping of profileType.skillMappings) {
      // Find all assessments that contribute to this skill
      const relatedAssessments = assessmentResults.filter(result =>
        skillMapping.assessmentTypes.includes(result.type)
      )

      if (relatedAssessments.length === 0) continue

      // Calculate weighted proficiency from multiple assessments
      const proficiency = this.calculateWeightedScore(relatedAssessments, skillMapping)

      skillProfiles.push({
        skillName: skillMapping.skillName,
        category: skillMapping.skillCategory,
        proficiency: Math.round(proficiency),
        required: skillMapping.minRequired,
        evidence: relatedAssessments,
        proficiencySource: relatedAssessments.map(a => a.type)
      })
    }

    return skillProfiles
  }

  private static calculateWeightedScore(
    assessments: AssessmentResult[],
    skillMapping: SkillMapping
  ): number {
    if (assessments.length === 0) return 0

    // Weight recent assessments higher
    const weighted = assessments.reduce((sum, assessment) => {
      const age = Date.now() - assessment.timestamp.getTime()
      const ageWeight = Math.max(0.5, 1 - age / (90 * 24 * 60 * 60 * 1000)) // 90 days decay
      return sum + assessment.score * ageWeight
    }, 0)

    return weighted / assessments.length
  }

  static generateReport(
    candidateId: string,
    profileId: string,
    assessmentResults: AssessmentResult[]
  ): AssessmentReport | null {
    const profileType = this.getProfileType(profileId)
    if (!profileType) return null

    const skills = this.generateSkillProfile(assessmentResults, profileType)

    // Calculate overall score
    const overallScore = this.calculateOverallScore(skills, profileType)

    // Identify gaps and strengths
    const gaps = skills
      .filter(s => s.proficiency < s.required)
      .map(s => ({
        skill: s.skillName,
        current: s.proficiency,
        required: s.required,
        gap: s.required - s.proficiency
      }))
      .sort((a, b) => b.gap - a.gap)

    const strengths = skills
      .filter(s => s.proficiency >= s.required + 10)
      .map(s => ({
        skill: s.skillName,
        current: s.proficiency,
        required: s.required,
        gap: s.proficiency - s.required
      }))
      .sort((a, b) => b.gap - a.gap)

    // Generate recommendations
    const recommendations = this.generateRecommendations(skills, gaps, profileType)

    return {
      profileType: profileType.name,
      candidateId,
      generatedAt: new Date(),
      overallScore,
      skills,
      gaps,
      strengths,
      recommendations,
      assessmentsConducted: assessmentResults
    }
  }

  private static calculateOverallScore(
    skills: GeneratedSkillProfile[],
    profileType: ProfileType
  ): number {
    const categoryScores = {
      technical: skills
        .filter(s => s.category === 'technical')
        .reduce((sum, s) => sum + s.proficiency, 0) /
        skills.filter(s => s.category === 'technical').length || 0,
      communication: skills
        .filter(s => s.category === 'communication')
        .reduce((sum, s) => sum + s.proficiency, 0) /
        skills.filter(s => s.category === 'communication').length || 0,
      confidence: skills
        .filter(s => s.category === 'confidence')
        .reduce((sum, s) => sum + s.proficiency, 0) /
        skills.filter(s => s.category === 'confidence').length || 0
    }

    return Math.round(
      categoryScores.technical * profileType.weightage.technical +
      categoryScores.communication * profileType.weightage.communication +
      categoryScores.confidence * profileType.weightage.confidence
    )
  }

  private static generateRecommendations(
    skills: GeneratedSkillProfile[],
    gaps: SkillGap[],
    profileType: ProfileType
  ): Recommendation[] {
    const recommendations: Recommendation[] = []

    // High priority gaps
    gaps.slice(0, 2).forEach(gap => {
      recommendations.push({
        type: 'improvement',
        skill: gap.skill,
        description: `Focus on improving ${gap.skill}. Current level: ${gap.current}%, Required: ${gap.required}%`,
        priority: 'high'
      })
    })

    // Medium priority gaps
    gaps.slice(2, 4).forEach(gap => {
      recommendations.push({
        type: 'improvement',
        skill: gap.skill,
        description: `Consider improving ${gap.skill} to meet job requirements.`,
        priority: 'medium'
      })
    })

    // Strengths to leverage
    skills
      .filter(s => s.proficiency >= s.required + 15)
      .slice(0, 2)
      .forEach(skill => {
        recommendations.push({
          type: 'strength',
          skill: skill.skillName,
          description: `Your ${skill.skillName} is a strong asset. Continue leveraging this in interviews.`,
          priority: 'high'
        })
      })

    return recommendations
  }

  // Add new profile type dynamically
  static addProfileType(profileType: ProfileType): void {
    PROFILE_TYPES[profileType.id] = profileType
  }

  // Get all available profile types
  static getAllProfileTypes(): ProfileType[] {
    return Object.values(PROFILE_TYPES)
  }
}
