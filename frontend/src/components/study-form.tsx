import { FormEvent, useState } from 'react';
import { CreateStudyPayload } from '@/types/study';
import styles from '../styles/study-form.module.css';

interface StudyFormProps {
  onSubmit: (study: CreateStudyPayload) => Promise<void>;
  loading: boolean;
}

export const StudyForm = ({ onSubmit, loading }: StudyFormProps) => {
  const [patientName, setPatientName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patientName.trim() || !type.trim()) {
      setFormError('Por favor, complete todos los campos');
      return;
    }

    setFormError(null);
    await onSubmit({
      patient_name: patientName,
      type,
      status,
    });

    // Limpiar el formulario
    setPatientName('');
    setType('');
    setStatus('pendiente');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formError && (
        <div className={styles.formError}>
          {formError}
        </div>
      )}
      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre del Paciente</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tipo de Estudio</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.select}
          disabled={loading}
        >
          <option value="">Seleccione un tipo</option>
          <option value="Tomografía">Tomografía</option>
          <option value="Resonancia">Resonancia</option>
          <option value="Rayos X">Rayos X</option>
          <option value="Ecografía">Ecografía</option>
          <option value="Análisis de Sangre">Análisis de Sangre</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
          disabled={loading}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? 'Agregando...' : 'Agregar Estudio'}
      </button>
    </form>
  );
};
