class Logger {
  logInfo(value: string) {
    console.log(value);
  }

  logDebug(value: string) {
    console.debug(value);
  }

  logWarn(value: string) {
    console.warn(value);
  }

  logError(value: string) {
    console.error(value);
  }

  logFaltal(value: string) {
    console.error(value);
  }
}

export default Logger;
