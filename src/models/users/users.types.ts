import { Document, Model } from 'mongoose'

import { IUser } from '../../interfaces/users'

interface IUserDocument extends IUser, Document {
  setLastUpdated: () => Promise<void>
  sameLastName: () => Promise<Document[]>
  setFirstName: (firstName: string) => Promise<IUserDocument>
}

interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    this: IUserModel,
    {
      firstName,
      lastName,
      age,
    }: { firstName: string; lastName: string; age: number },
  ) => Promise<IUserDocument>
  findByAge: (
    this: IUserModel,
    min?: number,
    max?: number,
  ) => Promise<IUserDocument[]>
}

export { IUserDocument, IUserModel }
