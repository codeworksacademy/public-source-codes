import { Schema } from "mongoose";




export const ImageSchema = new Schema({
  image: { type: String, required: true, maxLength: 1000 },
  authorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


ImageSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
