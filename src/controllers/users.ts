import { FastifyReply } from 'fastify'

import logger from '../utils/logger'

import {  IApiResponse } from '../interfaces/api'
import {
  ICreateUserRequestData,
  ISearchUserRequestData,
  ISearchUserResult
} from '../interfaces/users'

import { createUser, searchUser } from '../services/users'
import { IUserDocument } from '../models/users/users.types'

async function signUpCtrl(
  req: ICreateUserRequestData,
  res: FastifyReply,
): Promise<IApiResponse> {
  try {
    const { body } = req
    let u: IUserDocument = await createUser(body)
    await u.setLastUpdated()
    u = await u.setFirstName('Dong Ngu hoc')
    return {
      status: true,
      data: u,
    }
  } catch (err) {
    res.code(500)
    return {
      status: false,
      message: err.message,
    }
  }
}

async function searchUserCtrl(
  req: ISearchUserRequestData,
  res: FastifyReply,
): Promise<IApiResponse> {
  try {
    const { page, size, keyword } = req.body
    const data: ISearchUserResult = await searchUser({
      page,
      size,
      keyword,
    })
    return {
      status: true,
      data,
    }
  } catch (err) {
    res.code(400)
    logger.error(err)
    return {
      status: false,
      message: err.message,
    }
  }
}

export { signUpCtrl, searchUserCtrl }
