import { FastifyInstance } from 'fastify'
import { signUpCtrl, searchUserCtrl } from '../controllers/users'
import {
  searchUserSchema,
  userSignUpSchema,
} from '../validations/requests/users'

async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/signup', { schema: userSignUpSchema }, signUpCtrl)
  fastify.post('/search', { schema: searchUserSchema }, searchUserCtrl)
}
export default userRoutes
export const autoPrefix = '/users'
