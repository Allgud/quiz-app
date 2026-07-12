import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.root}>
      {text}
    </button>
  );
};
