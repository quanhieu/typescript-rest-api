import mongoose, { Document } from 'mongoose'
import { RequestParams } from '@elastic/elasticsearch'
import es7 from '../infra/elasticsearch'
const { Schema } = mongoose

import { IUser, IUserToken } from '../interfaces/users'

export const userSchema = new Schema({
  email: 'string',
  firstName: 'string',
  lastName: 'string',
  createdAt: Date,
  updatedAt: Date,
})

userSchema.methods.login = async function (
  password: string,
): Promise<IUserToken> {
  return {
    idToken: '123' + password,
    refreshToken: '456',
  }
}

userSchema.methods.indexToElasticsearch = async function (): Promise<void> {
  const u = this.toJSON()
  const _id = u._id
  delete u._id
  const req: RequestParams.Index = {
    index: 'users',
    id: _id,
    refresh: 'wait_for',
    body: u,
  }
  await es7.index(req)
}

export interface IUserModel extends IUser, Document {
  login(password: string): Promise<IUserToken>
  signup(password: string): Promise<void>
  setPassword(password: string): Promise<void>
  indexToElaticsearch(): Promise<void>
}

export default mongoose.model<IUserModel>('users', userSchema)
