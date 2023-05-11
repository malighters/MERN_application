import mongoose, { model } from "mongoose";
import { IPig } from "./interfaces/pig-interface";

const pigSchema = new mongoose.Schema<IPig>({
  tag: {
    type: String,
    required: [true, 'Please provide tag number'],
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: 'Male',
  },
  breed: {
    type: String,
    enum: ['Berkshire', 'Chester White', 'Duroc', 'Hampshire', 'Landrace', 'Poland China', 'Spotted', 'Yorkshire'],
    default: 'Berkshire',
  },
  birth_date: {
    type: Date,
    default: Date.now(),
  },
  note: {
    type: String,
    default: '',
  }
});

pigSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Pig = model<IPig>('Pig', pigSchema);

export default Pig;