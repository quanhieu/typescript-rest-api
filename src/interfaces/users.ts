import { IRequestData } from './api'

// API REQUEST INTERFACE
export interface ICreateUserRequestData extends IRequestData {
  body: {
    email: string
    password: string
  }
}

export interface ISearchUserRequestData extends IRequestData {
  body: {
    page: number
    size: number
    keyword: string
  }
}

// MODEL USER INTERFACE
export interface IUser {
  email: string
  firstName: string
  lastName: string
  age: number
  dateOfEntry?: Date
  lastUpdated?: Date
}

export interface ICreateUser {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface IUserToken {
  idToken?: string
  refreshToken?: string
}

// ELASTICSEARCH QUERY INTERFACE
export interface ISearchUser {
  page: number
  size: number
  keyword: string
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
