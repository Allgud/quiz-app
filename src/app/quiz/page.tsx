"use client";

import { useState } from "react";
import { Question } from "./components/Question";
import { Button } from "../components/Button";

import styles from "./page.module.css";
import { ProgressBar } from "../components/ProgressBar";

const mockQuestion = {
  id: "mock",
  text: "С каким типом можно вызвать метод без сужения типа?",
  order: 7,
  options: [
    { text: "any", id: "any" },
    { text: "unknown", id: "unknown" },
    { text: "с обоими", id: "both" },
    { text: "ни с одним", id: "noone" },
  ],
};

export default function Quiz() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectAnswer = (id: string) => setSelectedId(id);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Question
          question={mockQuestion}
          selectedId={selectedId}
          onSelect={handleSelectAnswer}
        />
      </div>

      <ProgressBar progress={50} />

      <footer className={styles.footer}>
        <Button text="Ответить" onClick={() => {}} disabled />
      </footer>
    </div>
  );
}
