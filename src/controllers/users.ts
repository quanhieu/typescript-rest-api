import logger from '../utils/logger'

import { apiResponse } from '../interfaces/api'
import {
  ICreateUserRequestData,
  ISearchUserRequestData,
} from '../interfaces/users'

import { createUser, searchUser } from '../services/users'
import { FastifyReply } from 'fastify'
import { IUserDocument } from '../models/users/users.types'

async function signUpCtrl(
  req: ICreateUserRequestData,
  res: FastifyReply,
): Promise<apiResponse> {
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
): Promise<apiResponse> {
  try {
    const { page, size, keyword } = req.body
    logger.info(req.body)
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
