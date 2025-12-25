import type { StudyStatus, StudyType } from '@/constants';

/**
 * Tipos para los estudios médicos
 */

export interface Study {
  id: number;
  patient_name: string;
  type: StudyType;
  status: StudyStatus;
}

export interface CreateStudyPayload {
  patient_name: string;
  type: string;
  status: string;
}

export interface StudyMetrics {
  total: number;
  pending: number;
  completed: number;
}
