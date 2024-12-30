import { EventEmitter } from "events";

export function сalculation(firstNum, secondNum, operation) {
  const myEmmiter = new EventEmitter();

  myEmmiter.once("plus", (firstNum, secondNum) =>
    console.log(firstNum + secondNum)
  );
  myEmmiter.once("minus", (firstNum, secondNum) =>
    console.log(firstNum - secondNum)
  );
  myEmmiter.once("multiply", (firstNum, secondNum) =>
    console.log(firstNum * secondNum)
  );
  myEmmiter.once("remainder", (firstNum, secondNum) =>
    console.log(firstNum % secondNum)
  );
  myEmmiter.once("divided", (firstNum, secondNum) => {
    if (secondNum === 0) {
      console.log("на ноль делить нельзя");
    }

    console.log(
      Intl.NumberFormat("ru", {
        maximumFractionDigits: 2,
      }).format(firstNum / secondNum)
    );
  });

  myEmmiter.emit(operation, firstNum, secondNum);
}
