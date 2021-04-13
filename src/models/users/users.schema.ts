import * as Mongoose from 'mongoose'

import { findOneOrCreate, findByAge } from './users.statics'
import { setLastUpdated, sameLastName, setFirstName } from './users.methods'

const UserSchema = new Mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  age: Number,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
})

// Static method for model
UserSchema.statics.findOneOrCreate = findOneOrCreate
UserSchema.statics.findByAge = findByAge

// Method of instance
UserSchema.methods.setLastUpdated = setLastUpdated
UserSchema.methods.sameLastName = sameLastName
UserSchema.methods.setFirstName = setFirstName

export default UserSchema
