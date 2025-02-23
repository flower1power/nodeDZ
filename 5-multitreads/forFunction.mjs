import { performance, PerformanceObserver } from "perf_hooks";
import { calculate } from "./calculate.mjs";

let syncTime = 0;

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntriesByType("measure").forEach((item) => {
    if (item.name === "syncFunc") {
      syncTime = item.duration;
    }
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

export const forFunction = (arr) => {
  performance.mark("startSync");

  const result = calculate(arr);

  performance.mark("endSync");
  const measure = performance.measure("syncFunc", "startSync", "endSync");

  return { result, time: measure.duration };
};
