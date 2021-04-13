import { Document } from 'mongoose'
import { IUserDocument } from './users.types'

async function setLastUpdated(): Promise<void> {
  const now = new Date()
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now
    await this.save()
  }
}

async function sameLastName(): Promise<Document[]> {
  return this.model('users').find({ lastName: this.lastName })
}

async function setFirstName(firstName: string): Promise<IUserDocument> {
  this.firstName = firstName
  await this.save()
  return this
}

export { setLastUpdated, sameLastName, setFirstName }
