import mongoose from 'mongoose'
import { RequestParams } from '@elastic/elasticsearch'

import models from '../models'
import {
  ICreateUser,
  IESUser,
  ISearchUser,
  ISearchUserResult,
} from '../interfaces/users'
import es7 from '../infra/elasticsearch'
import { SearchResponse } from '../interfaces/elasticsearch'
import { IUserDocument } from '../models/users/users.types'

async function createUser(inp: ICreateUser): Promise<IUserDocument> {
  const u = new models.users({
    _id: new mongoose.Types.ObjectId(),
    email: inp.email,
    firstName: inp.firstName,
    lastName: inp.lastName,
  })
  await u.save()
  return u
}

async function searchUser(inp: ISearchUser): Promise<ISearchUserResult> {
  const { page, size, keyword } = inp
  const resp = await es7.search<SearchResponse<IESUser>>({
    index: 'users',
    body: {
      query: {
        bool: {
          should: keyword
            ? [
                {
                  match: {
                    firstName: keyword,
                  },
                },
                {
                  match: {
                    lastName: keyword,
                  },
                },
              ]
            : [],
        },
      },
    },
    from: (page - 1) * size,
    size: size,
  })
  const data = resp.body.hits.hits
  const users: IESUser[] = []
  for (const u of data) {
    users.push({ ...u._source, _score: u._score })
  }
  const result: ISearchUserResult = {
    total: resp.body.hits.total,
    data: users,
  }
  return result
}
export { createUser, searchUser }
