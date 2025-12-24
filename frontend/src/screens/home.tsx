import { useState, useCallback } from 'react';
import { Title, Subtitle, Card, MetricCard, StudyList, StudyForm } from '@/components';
import { useFetch } from '@/hooks/useFetch';
import { studiesService } from '@/services/studies.service';
import { Study, CreateStudyPayload, StudyMetrics } from '@/types/study';

export const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para obtener estudios
  const fetchStudies = useCallback(() => {
    return studiesService.getStudies();
  }, [refreshKey]);

  // Hook para obtener los estudios
  const { data: studies, loading, error } = useFetch<Study[]>(fetchStudies, [refreshKey]);

  // Calcular métricas
  const metrics: StudyMetrics = {
    total: studies?.length || 0,
    pending: studies?.filter((s) => s.status === 'pendiente').length || 0,
    completed:
      studies?.filter((s) => s.status === 'completado' || s.status === 'terminado').length || 0,
  };

  // Manejar el envío del formulario
  const handleCreateStudy = async (payload: CreateStudyPayload) => {
    try {
      setIsSubmitting(true);
      await studiesService.createStudy(payload);
      // Refrescar la lista de estudios
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error('Error al crear estudio:', err);
      alert('Error al crear el estudio. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title text="Dashboard de Estudios Médicos" />

        {/* Métricas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          <MetricCard title="Total de Estudios" value={metrics.total} color="#3b82f6" />
          <MetricCard title="Estudios Pendientes" value={metrics.pending} color="#f59e0b" />
          <MetricCard title="Estudios Completados" value={metrics.completed} color="#10b981" />
        </div>

        {/* Contenido principal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {/* Formulario para agregar estudios */}
          <Card>
            <Subtitle text="Agregar Nuevo Estudio" />
            <StudyForm onSubmit={handleCreateStudy} loading={isSubmitting} />
          </Card>

          {/* Lista de estudios */}
          <Card>
            <Subtitle text="Lista de Estudios" />
            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                Cargando estudios...
              </div>
            )}
            {error && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#ef4444',
                }}
              >
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

