// Define a custom error class
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    // Call the parent class (Error) constructor
    super(message);

    // Custom properties for error
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;

    // Capturing stack trace, excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
