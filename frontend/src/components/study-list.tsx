import { Study } from '@/types/study';
import styles from '@/styles/study-list.module.css';
import '../styles/scrollbar.css';

interface StudyListProps {
  studies: Study[];
}

export const StudyList = ({ studies }: StudyListProps) => {
  const getStatusClassName = (status: string): string => {
    if (status === 'pendiente') return styles.statusPendiente;
    if (status === 'completado' || status === 'terminado') return styles.statusCompletado;
    return styles.statusDefault;
  };

  const getStatusText = (status: string): string => {
    if (status === 'terminado') return 'completado';
    return status;
  };

  if (studies.length === 0) {
    return (
      <div className={styles.emptyState}>
        No hay estudios registrados
      </div>
    );
  }

  return (
    <div className={`${styles.container} custom-scrollbar`}>
      {studies.map((study) => (
        <div key={study.id} className={styles.studyCard}>
          <div className={styles.studyInfo}>
            <h3 className={styles.patientName}>
              {study.patient_name}
            </h3>
            <p className={styles.studyType}>
              {study.type}
            </p>
          </div>
          <span className={`${styles.statusBadge} ${getStatusClassName(study.status)}`}>
            {getStatusText(study.status)}
          </span>
        </div>
      ))}
    </div>
  );
};
