
export const EmploymentStatuses = {
  EMPLOYED: 'employed',
  SELF_EMPLOYED: 'self_employed',
  UNEMPLOYED: 'unemployed',
  STUDENT: 'student',
  RETIRED: 'retired',
} as const;

export type EmploymentStatus = typeof EmploymentStatuses[keyof typeof EmploymentStatuses];

export const KnowledgeLevels = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export type KnowledgeLevel = typeof KnowledgeLevels[keyof typeof KnowledgeLevels];