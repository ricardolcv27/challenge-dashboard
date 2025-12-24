import { Study } from '@/types/study';

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
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        No hay estudios registrados
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {studies.map((study) => (
        <div
          key={study.id}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.25rem',
              }}
            >
              {study.patient_name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
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
