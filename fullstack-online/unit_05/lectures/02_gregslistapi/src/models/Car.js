import { Schema } from "mongoose";



export const CarSchema = new Schema({
  make: { type: String, minLength: 3, maxLength: 50, required: true },
  model: { type: String, minLength: 1, maxLength: 100, required: true },
  year: { type: Number, min: 1886, max: 2025, required: true },
  price: { type: Number, min: 0, max: 1000000, required: true },
  description: { type: String, min: 0, max: 500, required: true },
  engineType: { type: String, enum: ['4-cylinder', 'V6', 'V8', 'V10', 'unknown'], default: 'unknown', required: true },
  color: { type: String, maxLength: 50 },
  tags: [{ type: String, maxLength: 25 }],
  mileage: { type: Number, min: 0, max: 1000000, required: true, default: 0 },
  hasCleanTitle: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { toJSON: { virtuals: true } })

CarSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
