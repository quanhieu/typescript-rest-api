import { IRequestData } from './api'
export interface ICreateUser {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface ICreateUserRequestData extends IRequestData {
  body: {
    email: string
    password: string
  }
}

export interface IUserToken {
  idToken?: string
  refreshToken?: string
}

export interface IUser {
  email: string
  firstName: string
  lastName: string
  age: number
  dateOfEntry?: Date
  lastUpdated?: Date
}

export interface ISearchUser {
  page: number
  size: number
  keyword: string
}

export interface ISearchUserRequestData extends IRequestData {
  body: {
    page: number
    size: number
    keyword: string
  }
}

export interface ISearchUserResult {
  total: number
  data: IESUser[]
}

export interface IESUser {
  _id: string
  email: string
  firstName?: string
  lastName?: string
  _score: number
}
