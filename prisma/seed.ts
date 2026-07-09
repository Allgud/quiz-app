import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.question.create({
    data: {
      text: "Что вернёт typeof null?",
      order: 1,
      options: {
        create: [
          { text: "object", isCorrect: true },
          { text: "null", isCorrect: false },
          { text: "undefined", isCorrect: false },
          { text: "number", isCorrect: false },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "Чему равно выражение 0.1 + 0.2 === 0.3",
      order: 2,
      options: {
        create: [
          { text: "true", isCorrect: false },
          { text: "false", isCorrect: true },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "Что выведет console.log([] + [])",
      order: 3,
      options: {
        create: [
          { text: '" "', isCorrect: true },
          { text: "NaN", isCorrect: false },
          { text: "0", isCorrect: false },
          { text: "[object Object]", isCorrect: false },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "Что выведет код ниже?",
      order: 4,
      code: "console.log(a);\nvar a = 5;",
      options: {
        create: [
          { text: "null", isCorrect: false },
          { text: "ReferenceError", isCorrect: false },
          { text: "5", isCorrect: false },
          { text: "undefined", isCorrect: true },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "Что выведется в консоль?",
      order: 5,
      code: "for (var i = 0; i < 3; i++) {\n setTimeout(() => console.log(i), 0);\n}",
      options: {
        create: [
          { text: "0 1 2", isCorrect: false },
          { text: "3 3 3", isCorrect: true },
          { text: "1 2 3", isCorrect: false },
          { text: "0 0 0", isCorrect: false },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "Можно ли дополнить interface новыми полями после объявления?",
      order: 6,
      options: {
        create: [
          { text: "Да, и interface и type", isCorrect: false },
          { text: "Только в .d.ts файлах", isCorrect: false },
          { text: "Да, только interface это поддерживает", isCorrect: true },
          { text: "Нет", isCorrect: false },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      text: "С каким типом можно вызвать метод без сужения типа?",
      order: 7,
      options: {
        create: [
          { text: "any", isCorrect: true },
          { text: "unknown", isCorrect: false },
          { text: "с обоими", isCorrect: false },
          { text: "ни с одним", isCorrect: false },
        ],
      },
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
