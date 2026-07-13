"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect, Suspense } from "react";
import { Question } from "./components/Question";
import { Button } from "../components/Button";

import styles from "./page.module.css";
import { ProgressBar } from "../components/ProgressBar";
import type { Question as QuestionType } from "@/types";

export default function Quiz() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const attemptId = searchParams.get("attemptId");
  const isFinalQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (id: string) => setSelectedId(id);

  const handleAnswer = async () => {
    await fetch(`/api/attempt/${attemptId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId: selectedId }),
    });

    if (isFinalQuestion) {
      await fetch(`/api/attempt/${attemptId}`, { method: "PATCH" });
      router.push(`/results?attemptId=${attemptId}`);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await fetch("/api/questions")
          .then((data) => data.json())
          .then((data) => data.questions);

        setQuestions(questions);
      } catch (error) {
        setError(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className={styles.root}>
        <div className={styles.content}>
          {!isLoading && Boolean(questions.length) && (
            <Question
              question={questions[currentQuestion]}
              selectedId={selectedId}
              onSelect={handleSelectAnswer}
            />
          )}

          {isLoading && <div>Загрузка...</div>}
        </div>

        <ProgressBar
          progress={((currentQuestion + 1) / questions.length) * 100}
        />

        <footer className={styles.footer}>
          <Button
            text={isFinalQuestion ? "Завершить" : "Ответить"}
            onClick={handleAnswer}
            disabled={!selectedId}
          />
        </footer>
      </div>
    </Suspense>
  );
}
