type TGetArgs = Record<string, string | string[] | boolean>;

export const getArgs = (args: string[]): TGetArgs => {
  const res: TGetArgs = {};

  const [, , ...rest] = args;
  rest.forEach((value: string, index: number, array: string[]): void => {
    if (value.charAt(0) === '-') {
      if (index === array.length - 1) {
        res[value.substring(1)] = true;
      } else if (array[index + 1].charAt(0) !== '-') {
        const key = value.substring(1);
        if (key === 's') {
          res[key] = array[index + 1].split(',');
        } else {
          res[key] = array[index + 1];
        }
      } else {
        res[value.substring(1)] = true;
      }
    }
  });

  return res;
};
