import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// Define the errorHandler with the correct signature
export const errorHandler: ErrorRequestHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // CastError error
    if (err.name === "CastError") {
      res.status(404).json({ message: err.message || "cast error" });
    }
    // Unauthorized error

    if (err.name === "UnauthorizedError") {
      res.status(401).json({ message: "The user is not authorized" });
    }

    // Validation error
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message || "Validation error" });
    } // Validation error
  } catch (error) {
    // Generic error handler for other errors
    res.status(500).json({
      message: "An internal server error occurred",
      error: err.message || err,
    });
  }
};
