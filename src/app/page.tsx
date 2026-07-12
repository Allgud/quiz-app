import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>JS/TS Quest</h1>
        <h2>Проверь себя</h2>
      </div>

      <nav className={styles.navigation}>
        <Link href="/quiz" className={styles.link}>
          Начать
        </Link>
        <Link href="/leaderboard" className={styles.link}>
          Лидерборд
        </Link>
      </nav>
    </div>
  );
}
