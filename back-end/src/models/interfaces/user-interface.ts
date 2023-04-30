import { Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  fullName: string;
}

export interface IUserMethods {
  createJWT(): string; 
}

export type UserModel = Model<IUser, {}, IUserMethods>;