import Link from "next/link";

import styles from "./page.module.css";

const mockResults = [
  { sessionId: "first", points: "5/7", date: "12.07.2026" },
  { sessionId: "second", points: "6/7", date: "13.07.2026" },
];

export default function Leaderboard() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3>Таблица результатов</h3>

        <Link href="/">Вернуться на главную</Link>
      </div>

      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th>#</th>
            <th>Очки</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          {mockResults.map((result, index) => (
            <tr key={result.sessionId} className={styles.tableRow}>
              <td>{index + 1}</td>
              <td>{result.points}</td>
              <td>{result.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
