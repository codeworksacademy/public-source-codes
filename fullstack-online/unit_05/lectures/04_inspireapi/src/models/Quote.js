import { Schema } from "mongoose";


export const QuoteSchema = new Schema({
  body: { type: String, minLength: 5, maxLength: 250, required: true },
  authorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


QuoteSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
