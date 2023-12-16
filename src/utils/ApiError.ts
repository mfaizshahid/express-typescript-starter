/**
 * Represents an API error with an associated HTTP status code.
 */
export default class ApiError extends Error {
  // The HTTP status code associated with the error.
  private readonly statusCode: number;
  private readonly statusMessage: string;

  /**
   * Creates a new instance of ApiError.
   * @param statusCode {number} The HTTP status code associated with the error.
   * @param message {string} A message describing the error.
   * @param stack The stack trace for the error.
   */
  constructor(statusCode: number, message: string, stack = "") {
    super();
    this.statusCode = statusCode;
    this.statusMessage = message;
    this.message = message;
    if (stack !== "") {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
