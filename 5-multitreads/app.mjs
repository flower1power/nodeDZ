import { forFunction } from "./forFunction.mjs";
import { workerFunction, getTotalWorkerTime } from "./workerFunction.mjs";

const array = [...Array(300000)].map((_, i) => i + 1);
const quarter = Math.floor(array.length / 4);
const array1 = array.slice(0, quarter);
const array2 = array.slice(quarter, quarter * 2);
const array3 = array.slice(quarter * 2, quarter * 3);
const array4 = array.slice(quarter * 3);

async function main() {
  const { result: result1, time: syncTime } = forFunction(array);
  console.log(`Результат синхронного расчёта: ${result1}`);
  console.log(`Время выполнения синхронного расчёта: ${syncTime} ms`);

  const results = await Promise.all([
    workerFunction(array1),
    workerFunction(array2),
    workerFunction(array3),
    workerFunction(array4),
  ]);
  const total = results.reduce((acc, value) => acc + value, 0);
  console.log(`Результат параллельного расчёта: ${total}`);
  console.log(`Общее время выполнения workerFunc: ${getTotalWorkerTime()} ms`);
}

await main();
