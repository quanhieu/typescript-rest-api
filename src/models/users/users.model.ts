import * as Mongoose from 'mongoose'
import UserSchema from './users.schema'
import { IUserDocument } from './users.types'

const userModel = Mongoose.model<IUserDocument>('users', UserSchema)

export default userModel
