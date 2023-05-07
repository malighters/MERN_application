import { Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface IUserMethods {
  createJWT(): string; 
  comparePasswords(receivedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;