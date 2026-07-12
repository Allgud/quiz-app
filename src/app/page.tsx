"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "./components/Button";

export default function Home() {
  const router = useRouter();

  const getStart = async () => {
    const sessionId = await fetch("/api/session", { method: "POST" })
      .then((data) => data.json())
      .then((data) => data.sessionId);

    const attemptId = await fetch("/api/attempt", {
      method: "POST",
      headers: { Content_Type: "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((data) => data.json())
      .then((data) => data.attemptId);

    router.push(`/quiz?attemptId=${attemptId}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>JS/TS Quest</h1>
        <h2>Проверь себя</h2>
      </div>

      <nav className={styles.navigation}>
        <Button text="Начать" onClick={getStart} />
        <Link href="/leaderboard" className={styles.link}>
          Лидерборд
        </Link>
      </nav>
    </div>
  );
}
