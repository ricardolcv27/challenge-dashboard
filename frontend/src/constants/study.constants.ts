/**
 * Constantes y enumeraciones para estudios médicos
 */

export const STUDY_TYPES = {
  TOMOGRAFIA: 'Tomografía',
  RESONANCIA: 'Resonancia',
  RAYOS_X: 'Rayos X',
  ECOGRAFIA: 'Ecografía',
  ANALISIS_SANGRE: 'Análisis de Sangre',
} as const;

export const STUDY_STATUSES = {
  PENDIENTE: 'pendiente',
  COMPLETADO: 'completado',
} as const;

export type StudyType = (typeof STUDY_TYPES)[keyof typeof STUDY_TYPES];
export type StudyStatus = (typeof STUDY_STATUSES)[keyof typeof STUDY_STATUSES];

// Arrays para usar en selects
export const STUDY_TYPES_OPTIONS = Object.values(STUDY_TYPES);
export const STUDY_STATUSES_OPTIONS = Object.values(STUDY_STATUSES);
