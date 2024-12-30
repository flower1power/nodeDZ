import { operations } from "./operations.mjs";

let firstNum = Number(process.argv[2]);
let secondNum = Number(process.argv[3]);
let operation = process.argv[4];
let sum;

if (isNaN(firstNum) || isNaN(secondNum)) {
  console.error("Ошибка: Операнды должны быть числами.");
  process.exit(1);
}

if (!operation) {
  console.error("Ошибка: Операция не указана.");
  process.exit(1);
}

sum = operations(firstNum, secondNum, operation);
console.log(sum);
