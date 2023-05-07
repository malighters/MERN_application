import { Request, Response, Router } from "express";
import User from "../models/user-model";
import { IUser } from "../models/interfaces/user-interface";
import { BadRequestError } from "../errors/bad-request-error";
import { UnauthenticatedError } from "../errors/unauthenticated";

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response, next: Function) => {
  console.log(req.body);
  
  const { email, password, name }: IUser = req.body;
  if(!name || !email || !password) {
    throw new BadRequestError('Please fill all fields');
  } 

  const userExists: IUser | null = await User.findOne({email});
  if(userExists) {
    throw new BadRequestError('Email already in use');
  }

  const user  = await User.create({email, password, name});
  const token: string = await user.createJWT();
  res.status(201).json({user, token});
})

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError('Provide all credentials');
  }

  const user = await User.findOne({email});

  if(!user) {
    throw new UnauthenticatedError('This user does not exist');
  }

  const isPasswordMatch = await user.comparePasswords(password);
  if(!isPasswordMatch){
    throw new UnauthenticatedError('Invalid password');
  }
  else{ 
    const token: string = await user.createJWT();
    res.status(200).json({user, token});
  }
})

authRouter.patch('/update', async (req: Request, res: Response) => {
  
})

export default authRouter;