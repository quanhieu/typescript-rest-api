import { apiResponse } from '../interfaces/api'
import { ISearchUserResult } from '../interfaces/users'
import { createUser, searchUser } from '../services/users'
import logger from '../utils/logger'

async function signUpCtrl(req: any, res: any): Promise<apiResponse> {
  try {
    const { body } = req
    let u = await createUser(body)
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

async function searchUserCtrl(req: any, res: any): Promise<apiResponse> {
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
