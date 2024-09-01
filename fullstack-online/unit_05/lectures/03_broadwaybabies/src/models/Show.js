import { Schema } from "mongoose";



export const ShowSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 50 },
  handlerId: { type: Schema.ObjectId, ref: 'Account', required: true },
  animalId: { type: Schema.ObjectId, ref: 'Animal', required: true }
}, { toJSON: { virtuals: true } })


ShowSchema.virtual('handler', {
  localField: 'handlerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

ShowSchema.virtual('animal', {
  localField: 'animalId',
  ref: 'Animal',
  foreignField: '_id',
  justOne: true
})
