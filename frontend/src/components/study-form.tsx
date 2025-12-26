import { STUDY_STATUSES, STUDY_TYPES_OPTIONS, type StudyStatus, type StudyType } from '@/constants';
import styles from '@/styles/study-form.module.css';
import type { CreateStudyPayload } from '@/types/study';
import { type FormEvent, useState } from 'react';

interface StudyFormProps {
  onSubmit: (study: CreateStudyPayload) => Promise<void>;
  loading: boolean;
}

export const StudyForm = ({ onSubmit, loading }: StudyFormProps) => {
  const [patientName, setPatientName] = useState('');
  const [type, setType] = useState<StudyType | ''>('');
  const [status, setStatus] = useState<StudyStatus>(STUDY_STATUSES.PENDIENTE);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patientName.trim() || !type) {
      const missingFields = [];
      if (!patientName.trim()) missingFields.push('Nombre del Paciente');
      if (!type) missingFields.push('Tipo de Estudio');
      setFormError(`Por favor, complete los siguientes campos: ${missingFields.join(', ')}`);
      return;
    }

    setFormError(null);
    await onSubmit({
      patient_name: patientName,
      type: type as StudyType,
      status,
    });

    // Limpiar el formulario
    setPatientName('');
    setType('');
    setStatus(STUDY_STATUSES.PENDIENTE);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formError && <div className={styles.formError}>{formError}</div>}
      <div className={styles.formGroup}>
        <label htmlFor="patientName" className={styles.label}>
          Nombre del Paciente
        </label>
        <input
          id="patientName"
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="studyType" className={styles.label}>
          Tipo de Estudio
        </label>
        <select
          id="studyType"
          value={type}
          onChange={(e) => setType(e.target.value as StudyType)}
          className={styles.select}
          disabled={loading}
        >
          <option value="">Seleccione un tipo</option>
          {STUDY_TYPES_OPTIONS.map((studyType) => (
            <option key={studyType} value={studyType}>
              {studyType}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="studyStatus" className={styles.label}>
          Estado
        </label>
        <select
          id="studyStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value as StudyStatus)}
          className={styles.select}
          disabled={loading}
        >
          <option value={STUDY_STATUSES.PENDIENTE}>Pendiente</option>
          <option value={STUDY_STATUSES.COMPLETADO}>Completado</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? 'Agregando...' : 'Agregar Estudio'}
      </button>
    </form>
  );
};
