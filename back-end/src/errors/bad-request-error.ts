import { CustomAPIError } from "./custom-api-error";

export class BadRequestError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400; 
  }
}