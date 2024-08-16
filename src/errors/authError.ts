class AuthError extends Error {
  constructor(
    public status: number,
    public code: number,
    public message: string
  ) {
    super(message);
  }
}

export default AuthError;
