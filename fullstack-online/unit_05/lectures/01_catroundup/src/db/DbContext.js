import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CatSchema } from '../models/Cat.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Cats = mongoose.model('Cat', CatSchema)
}

export const dbContext = new DbContext()
