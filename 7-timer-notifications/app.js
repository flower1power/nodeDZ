const notifier = require("node-notifier");
const path = require("path");

let h = convertNaN(Number(process.argv[2]));
let m = convertNaN(Number(process.argv[3]));
let s = convertNaN(Number(process.argv[4]));

function convertNaN(input) {
  return isNaN(input) ? 0 : input;
}

function calculate(h, m, s) {
  return s * 1000 + m * 60 * 1000 + h * 3600 * 1000;
}

console.log(`Таймер установлен на ${h} часов, ${m} минут, ${s} секунд.`);

setTimeout(() => {
  notifier.notify({
    title: "Таймер",
    message: "Таймер истек",
    sound: true,
    wait: true,
    actions: ["Отключить таймер"],
  });

  notifier.on("click", function () {
    console.log("Пользователь отключил таймер.");
  });
}, calculate(h, m, s));
