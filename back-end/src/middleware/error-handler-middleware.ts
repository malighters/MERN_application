import { Request, Response } from "express";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: Function) => { 
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something wrong happened, try again later",
  }
  
  if(err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map((err: any) => err.message).join(', ');
    error.statusCode = 400
  }
  if(err.code && err.code === 11000){
    error.message = `${Object.keys(err.keyValue)} has to be unique`;
    error.statusCode = 400;
  }
  return res.status(error.statusCode).json({"Error": error.message});
}
export default errorHandlerMiddleware;