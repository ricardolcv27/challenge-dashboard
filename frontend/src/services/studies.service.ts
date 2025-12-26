import { api } from '@/lib/api';
import type { CreateStudyPayload, Study, StudyMetrics } from '@/types/study';

/**
 * Servicio para gestionar estudios médicos
 */

export const studiesService = {
  /**
   * Obtener estudios con paginación
   */
  getStudies: async (offset = 0, limit = 5): Promise<Study[]> => {
    return api<Study[]>(`/studies?offset=${offset}&limit=${limit}`, { method: 'GET' });
  },

  /**
   * Obtener métricas de estudios
   */
  getMetrics: async (): Promise<StudyMetrics> => {
    return api<StudyMetrics>('/studies/metrics', { method: 'GET' });
  },

  /**
   * Crear un nuevo estudio
   */
  createStudy: async (payload: CreateStudyPayload): Promise<Study> => {
    return api<Study>('/studies', {
      method: 'POST',
      body: payload,
    });
  },
};
