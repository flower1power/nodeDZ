export function calculate(arr) {
  return arr.reduce((acc, el) => {
    if (el % 3 === 0) {
      acc++;
    }

    return acc;
  }, 0);
}
