import { plus } from "./plus.mjs";
import { minus } from "./minus.mjs";
import { multiply } from "./multiply.mjs";
import { divided } from "./divided.mjs";
import { remainder } from "./remainder.mjs";

export function operations(firstNum, secondNum, operation) {
  switch (operation) {
    case "plus":
      return plus(firstNum, secondNum);

    case "minus":
      return minus(firstNum, secondNum);

    case "multiply":
      return multiply(firstNum, secondNum);

    case "remainder":
      return remainder(firstNum, secondNum);

    case "divided":
      if (secondNum === 0) {
        return "на ноль делить нельзя";
      }

      return Intl.NumberFormat("ru", {
        maximumFractionDigits: 2,
      }).format(divided(firstNum, secondNum));

    default:
      return "Нет такой операции";
  }
}
