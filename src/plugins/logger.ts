class Logger {
  logInfo(value: string) {
    console.log("info : ", value);
  }

  logInfoStartProcess(value: string) {
    console.log("\n" + value);
  }

  logInfoEndingProcess(value: string) {
    console.log(value + "\n");
  }

  logDebug(value: string) {
    console.debug("debug : ", value);
  }

  logWarn(value: string) {
    console.warn("warn : ", value);
  }

  logError(value: string) {
    console.error("error : ", value);
  }

  logFaltal(value: string) {
    console.log("======================");
    console.error("faltal : ", value);
    console.log("======================");
  }
}

export default Logger;
