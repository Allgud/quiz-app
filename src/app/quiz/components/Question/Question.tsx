import type { Question as QuestionType } from "@/types";

import styles from "./Question.module.css";

type QuestionProps = {
  question: QuestionType | null;
  onSelect: (id: string) => void;
  selectedId: string | null;
};

export const Question = ({ question, onSelect, selectedId }: QuestionProps) => {
  if (question === null) return <div>Вопроса нет</div>;

  return (
    <div className={styles.root}>
      <h2>{question.text}</h2>

      {question.code && (
        <pre>
          <code>{question.code}</code>
        </pre>
      )}

      <ul>
        {question.options.map((option) => (
          <li key={option.id}>
            <div className={styles.option}>
              <input
                type="radio"
                name="question"
                value={option.id}
                checked={selectedId === option.id}
                onChange={() => onSelect(option.id)}
              />

              <span>{option.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
