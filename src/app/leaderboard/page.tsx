"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import type { Attempt } from "@/types";

import styles from "./page.module.css";

export default function Leaderboard() {
  const [results, setResults] = useState<Attempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setError(null);

      try {
        await fetch("/api/leaderboard")
          .then((data) => data.json())
          .then((data) => {
            setResults(data.results);
          });
      } catch (error) {
        setError(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (error) return <div>{error}</div>;

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
          {!isLoading &&
            results.map((result, index) => (
              <tr key={result.id} className={styles.tableRow}>
                <td>{index + 1}</td>
                <td>{result.score}</td>
                <td>
                  {new Intl.DateTimeFormat("ru-RU").format(
                    new Date(result.finishedAt!),
                  )}
                </td>
              </tr>
            ))}

          {isLoading && (
            <tr>
              <td colSpan={3}>Загрузка...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
