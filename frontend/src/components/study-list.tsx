import { Study } from '@/types/study';
import '../styles/scrollbar.css';

interface StudyListProps {
  studies: Study[];
}

export const StudyList = ({ studies }: StudyListProps) => {
  const getStatusColor = (status: string): string => {
    if (status === 'pendiente') return '#f59e0b';
    if (status === 'completado' || status === 'terminado') return '#10b981';
    return '#6b7280';
  };

  const getStatusText = (status: string): string => {
    if (status === 'terminado') return 'completado';
    return status;
  };

  if (studies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
        No hay estudios registrados
      </div>
    );
  }

  return (
    <div
      className="custom-scrollbar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxHeight: '400px',
        overflowY: 'auto', 
        paddingRight: '0.5rem', 
      }}
    >
      {studies.map((study) => (
        <div
          key={study.id}
          style={{
            backgroundColor: '#111827',
            borderRadius: '8px',
            padding: '1rem',
            border: '1px solid #374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'transform 0.2s',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#f3f4f6',
                marginBottom: '0.25rem',
              }}
            >
              {study.patient_name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              {study.type}
            </p>
          </div>
          <span
            style={{
              backgroundColor: getStatusColor(study.status),
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}
          >
            {getStatusText(study.status)}
          </span>
        </div>
      ))}
    </div>
  );
};
