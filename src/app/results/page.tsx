"use client";

import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";

export default function Results() {
  const searchParams = useSearchParams();

  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const attemptId = searchParams.get("attemptId");

  useEffect(() => {
    const fetchResults = async () => {
      const result = await fetch(`/api/attempt/${attemptId}`)
        .then((data) => data.json())
        .then((data) => ({
          score: data.attempt.score,
          total: data.total,
        }));

      console.log(result);

      setFinalScore(result.score);
      setTotalQuestions(result.total);
    };

    fetchResults();
  }, []);

  return (
    <div className={styles.root}>
      <h2>Опрос завершен</h2>

      <span>
        Твой результат: {finalScore} правильных ответов из {totalQuestions}
      </span>

      <Link href="/quiz" className={styles.link}>
        Начать заново
      </Link>
    </div>
  );
}
