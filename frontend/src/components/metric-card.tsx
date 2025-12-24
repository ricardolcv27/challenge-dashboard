interface MetricCardProps {
  title: string;
  value: number;
  color?: string;
}

export const MetricCard = ({ title, value, color = '#3b82f6' }: MetricCardProps) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: `4px solid ${color}`,
      }}
    >
      <h3
        style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#6b7280',
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
          color: '#1f2937',
        }}
      >
        {value}
      </p>
    </div>
  );
};
