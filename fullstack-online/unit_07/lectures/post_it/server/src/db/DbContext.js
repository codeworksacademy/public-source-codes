import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AlbumSchema } from '../models/Album.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Albums = mongoose.model('Album', AlbumSchema)
}

export const dbContext = new DbContext()
