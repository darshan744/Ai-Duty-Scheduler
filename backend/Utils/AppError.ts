class AppError extends Error {
  errorCode: number;
  message: string;
  constructor(message: string, errorStatusCode: number) {
    super(message);
    this.message = message;
    this.errorCode = errorStatusCode;
  }
}

export default AppError;
