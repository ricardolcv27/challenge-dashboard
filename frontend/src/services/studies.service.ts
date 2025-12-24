import { api } from '@/lib/api';
import { Study, CreateStudyPayload } from '@/types/study';

/**
 * Servicio para gestionar estudios médicos
 */

export const studiesService = {
  /**
   * Obtener todos los estudios
   */
  getStudies: async (): Promise<Study[]> => {
    return api<Study[]>('/studies', { method: 'GET' });
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
