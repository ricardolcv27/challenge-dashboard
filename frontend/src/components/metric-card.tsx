import styles from '@/styles/metric-card.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  color?: string;
}

export const MetricCard = ({ title, value, color = '#3b82f6' }: MetricCardProps) => {
  return (
    <div className={styles.card} style={{ ['--accent-color' as any]: color }}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
