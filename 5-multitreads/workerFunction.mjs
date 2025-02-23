import { performance, PerformanceObserver } from "perf_hooks";
import { Worker } from "worker_threads";

let totalWorkerTime = 0;

// const performanceObserver = new PerformanceObserver((items) => {
//   items.getEntriesByType("measure").forEach((item) => {
//     if (item.name === "workerFunc") {
//       totalWorkerTime += item.duration;
//     }
//   });
// });
// performanceObserver.observe({ entryTypes: ["measure"] });

export const workerFunction = async (arr) => {
  return await new Promise((resolve) => {
    performance.mark("start");

    const worker = new Worker("./worker.mjs", { workerData: arr });

    worker.on("message", (msg) => {
      performance.mark("end");
      const measure = performance.measure("workerFunc", "start", "end");
      totalWorkerTime += measure.duration;

      resolve(msg);
    });
  });
};

export const getTotalWorkerTime = () => totalWorkerTime;
