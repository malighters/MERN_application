import { CustomAPIError } from "./custom-api-error";


export class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404; 
  }
}