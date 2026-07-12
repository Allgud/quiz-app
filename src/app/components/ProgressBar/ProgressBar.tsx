import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number | null;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const width = progress ? `${Math.min(100, Math.max(0, progress))}%` : "0%";

  return (
    <div className={styles.root}>
      <div style={{ width: width }} className={styles.progress} />
    </div>
  );
};
