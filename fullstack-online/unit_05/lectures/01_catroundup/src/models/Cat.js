import { Schema } from "mongoose";


export const CatSchema = new Schema({
  name: { type: String, required: true, maxLength: 25, minLength: 3 },
  picture: { type: String, required: true, maxLength: 15 },
  age: { type: Number, required: true, min: 1, max: 35 }
})
