"use client";

import { useState, useEffect, Suspense } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";

export default function Results() {
  const searchParams = useSearchParams();

  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const attemptId = searchParams.get("attemptId");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await fetch(`/api/attempt/${attemptId}`)
          .then((data) => data.json())
          .then((data) => ({
            score: data.attempt.score,
            total: data.total,
          }));

        setFinalScore(result.score);
        setTotalQuestions(result.total);
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
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className={styles.root}>
        {isLoading && <div>Загрузка...</div>}

        {!isLoading && (
          <>
            <h2>Опрос завершен</h2>

            <span>
              Твой результат: {finalScore} правильных ответов из{" "}
              {totalQuestions}
            </span>

            <Link href="/" className={styles.link}>
              На главную
            </Link>
          </>
        )}
      </div>
    </Suspense>
  );
}
