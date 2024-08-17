class GlobalError extends Error {
  constructor(code: number, message: string) {
    super(message, { cause: code });
  }
}

export default GlobalError;
