import { Request, Response, Router } from "express";
import User from "../models/user-model";
import { IUser } from "../models/interfaces/user-interface";
import { BadRequestError } from "../errors/bad-request-error";

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response, next: Function) => {
  const { email, password, fullName }: IUser = req.body;
  if(!fullName || !email || !password) {
    throw new BadRequestError('Please fill all fields');
  } 

  const userExists: IUser | null = await User.findOne({email});
  if(userExists) {
    throw new BadRequestError('Email already in use');
  }

  const user  = await User.create({email, password, fullName});
  const token: string = await user.createJWT();
  res.status(201).json({user, token});
  
})

authRouter.post('/login', async (req: Request, res: Response) => {
  
})

authRouter.patch('/update', async (req: Request, res: Response) => {
  
})

export default authRouter;