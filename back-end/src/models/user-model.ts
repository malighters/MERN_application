import mongoose from "mongoose";
import validator from "validator";
import { IUser, IUserMethods, UserModel } from "./interfaces/user-interface";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_LIFETIME } from "../utils/config";

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String, 
    required: [true, 'Please provide your email'], 
    validate: [validator. isEmail, 'Please provide a valid email'],
    unique: true
  }, 
  password: {type: String, required: [true, 'Please provide your password']},
  fullName: {type: String, required: [true, 'Please provide your full name'], minLength: 3, maxLength: 20}, 
});

userSchema.pre('save', async function () {
  const user: IUser = this;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
})

userSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id}, JWT_SECRET, {expiresIn: JWT_LIFETIME});
}


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

//userSchema.methods.comparePasswords()

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;