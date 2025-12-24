interface MetricCardProps {
  title: string;
  value: number;
  color?: string;
}

export const MetricCard = ({ title, value, color = '#3b82f6' }: MetricCardProps) => {
  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: `4px solid ${color}`,
        border: '1px solid #374151',
      }}
    >
      <h3
        style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#9ca3af',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#f3f4f6',
        }}
      >
        {value}
      </p>
    </div>
  );
};
