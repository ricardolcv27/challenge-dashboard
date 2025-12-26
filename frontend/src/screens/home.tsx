import { Card, MetricCard, Pagination, StudyForm, StudyList, Subtitle, Title } from '@/components';
import { useFetch } from '@/hooks/useFetch';
import { studiesService } from '@/services/studies.service';
import styles from '@/styles/home.module.css';
import type { CreateStudyPayload, Study, StudyMetrics } from '@/types/study';
import { useCallback, useEffect, useState } from 'react';

export const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [metrics, setMetrics] = useState<StudyMetrics>({ total: 0, pending: 0, completed: 0 });
  const pageSize = 5;

  // Función para obtener estudios con paginación
  const fetchStudies = useCallback(() => {
    const offset = (currentPage - 1) * pageSize;
    return studiesService.getStudies(offset, pageSize);
  }, [currentPage]);

  // Hook para obtener los estudios
  const {
    data: studies,
    loading,
    error,
  } = useFetch<Study[]>(fetchStudies, [refreshKey, currentPage]);

  // Obtener métricas al cargar la página
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await studiesService.getMetrics();
        setMetrics(data);
      } catch (err) {
        console.error('Error al cargar métricas:', err);
      }
    };
    loadMetrics();
  }, []);

  // Calcular total de páginas
  const totalPages = Math.ceil(metrics.total / pageSize);

  // Manejar el envío del formulario
  const handleCreateStudy = async (payload: CreateStudyPayload) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      await studiesService.createStudy(payload);

      // Refrescar la lista de estudios
      setRefreshKey((prev) => prev + 1);

      try {
        const updatedMetrics = await studiesService.getMetrics();
        setMetrics(updatedMetrics);
      } catch (metricsErr) {
        console.error('Error al actualizar métricas:', metricsErr);
      }
    } catch (err) {
      console.error('Error al crear estudio:', err);
      setFormError('Error al crear el estudio. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar paginación
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
            {formError && <div className={styles.formError}>{formError}</div>}
            <StudyForm onSubmit={handleCreateStudy} loading={isSubmitting} />
          </Card>

          {/* Lista de estudios */}
          <Card>
            <Subtitle text="Lista de Estudios" />
            {loading && <div className={styles.loadingState}>Cargando estudios...</div>}
            {error && (
              <div className={styles.errorState}>Error al cargar los estudios: {error.message}</div>
            )}
            {!loading && !error && studies && (
              <>
                <StudyList studies={studies} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
                />
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
