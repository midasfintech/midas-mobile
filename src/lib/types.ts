
export const EmploymentStatuses = {
  EMPLOYED: 'employed',
  SELF_EMPLOYED: 'self_employed',
  UNEMPLOYED: 'unemployed',
  STUDENT: 'student',
  RETIRED: 'retired',
} as const;

export type EmploymentStatus = typeof EmploymentStatuses[keyof typeof EmploymentStatuses];