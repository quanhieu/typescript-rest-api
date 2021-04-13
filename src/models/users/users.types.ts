import { Document, Model } from 'mongoose'

export interface IUser {
  firstName: string
  lastName: string
  age: number
  dateOfEntry?: Date
  lastUpdated?: Date
}

export interface IUserDocument extends IUser, Document {
  setLastUpdated: () => Promise<void>
  sameLastName: () => Promise<Document[]>
  setFirstName: (firstName: string) => Promise<IUserDocument>
}

export interface IUserModel extends Model<IUserDocument> {
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
