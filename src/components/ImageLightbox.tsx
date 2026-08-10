import { useEffect, useId } from 'react';
import styles from './ImageLightbox.module.css';

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export function ImageLightbox({ src, alt = '', onClose }: Props) {
  const titleId = useId();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="关闭预览"
        onClick={onClose}
      >
        ×
      </button>
      <span id={titleId} className={styles.srOnly}>
        {alt || '图片预览'}
      </span>
      <img
        className={styles.image}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
