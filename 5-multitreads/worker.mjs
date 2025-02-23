import { parentPort, workerData } from "worker_threads";
import { calculate } from "./calculate.mjs";

parentPort.postMessage(calculate(workerData));
