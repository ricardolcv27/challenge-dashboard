import styles from '@/styles/pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPreviousPage, 
  onNextPage 
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button 
        onClick={onPreviousPage} 
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Anterior
      </button>
      <span className={styles.paginationInfo}>
        Página {currentPage} de {totalPages || 1}
      </span>
      <button 
        onClick={onNextPage} 
        disabled={currentPage >= totalPages || totalPages === 0}
        className={styles.paginationButton}
      >
        Siguiente
      </button>
    </div>
  );
};
