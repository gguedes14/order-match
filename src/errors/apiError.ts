import { HttpStatus } from "./enum/httpStatus";

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatus,
    message: string
  ) {
    super(message);
  }
}
