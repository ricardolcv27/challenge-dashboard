import { FormEvent, useState } from 'react';
import { CreateStudyPayload } from '@/types/study';

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

    setFormError(null); // Clear previous errors
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

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {formError && (
        <div
          style={{
            color: '#ef4444',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {formError}
        </div>
      )}
      <div>
        <label style={labelStyle}>Nombre del Paciente</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          style={inputStyle}
          disabled={loading}
        />
      </div>

      <div>
        <label style={labelStyle}>Tipo de Estudio</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={inputStyle}
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

      <div>
        <label style={labelStyle}>Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
          disabled={loading}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem',
        }}
      >
        {loading ? 'Agregando...' : 'Agregar Estudio'}
      </button>
    </form>
  );
};
