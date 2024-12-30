import { сalculation } from "./сalculation.mjs";

function Main() {
  let firstNum = Number(process.argv[2]);
  let secondNum = Number(process.argv[3]);
  let operation = process.argv[4];

  if (isNaN(firstNum) || isNaN(secondNum)) {
    console.error("Ошибка: Операнды должны быть числами.");
    process.exit(1);
  }

  if (!operation) {
    console.error("Ошибка: Операция не указана.");
    process.exit(1);
  }

  сalculation(firstNum, secondNum, operation);
}

Main();
