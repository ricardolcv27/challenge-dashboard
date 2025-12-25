import { useState, useCallback } from 'react';
import { Title, Subtitle, Card, MetricCard, StudyList, StudyForm } from '@/components';
import { useFetch } from '@/hooks/useFetch';
import { studiesService } from '@/services/studies.service';
import { Study, CreateStudyPayload, StudyMetrics } from '@/types/study';
import styles from '@/styles/home.module.css';

export const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Función para obtener estudios
  const fetchStudies = useCallback(() => {
    return studiesService.getStudies();
  }, []);

  // Hook para obtener los estudios
  const { data: studies, loading, error } = useFetch<Study[]>(fetchStudies, [refreshKey]);

  // Calcular métricas
  const metrics: StudyMetrics = {
    total: studies?.length || 0,
    pending: studies?.filter((s) => s.status === 'pendiente').length || 0,
    completed:
      studies?.filter((s) => s.status === 'completado').length || 0,
  };

  // Manejar el envío del formulario
  const handleCreateStudy = async (payload: CreateStudyPayload) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      await studiesService.createStudy(payload);
      // Refrescar la lista de estudios
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error('Error al crear estudio:', err);
      setFormError('Error al crear el estudio. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <Title text="Dashboard de Estudios Médicos" />

        {/* Métricas */}
        <div className={styles.metricsGrid}>
          <MetricCard title="Total de Estudios" value={metrics.total} color="#60a5fa" />
          <MetricCard title="Estudios Pendientes" value={metrics.pending} color="#fbbf24" />
          <MetricCard title="Estudios Completados" value={metrics.completed} color="#34d399" />
        </div>

        {/* Contenido principal */}
        <div className={styles.mainGrid}>
          {/* Formulario para agregar estudios */}
          <Card>
            <Subtitle text="Agregar Nuevo Estudio" />
            {formError && (
              <div className={styles.formError}>
                {formError}
              </div>
            )}
            <StudyForm onSubmit={handleCreateStudy} loading={isSubmitting} />
          </Card>

          {/* Lista de estudios */}
          <Card>
            <Subtitle text="Lista de Estudios" />
            {loading && (
              <div className={styles.loadingState}>
                Cargando estudios...
              </div>
            )}
            {error && (
              <div className={styles.errorState}>
                Error al cargar los estudios: {error.message}
              </div>
            )}
            {!loading && !error && studies && <StudyList studies={studies} />}
          </Card>
        </div>
      </div>
    </div>
  );
};

