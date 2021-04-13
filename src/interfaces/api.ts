import { FastifyRequest } from 'fastify'

interface api200Response {
  status: boolean
  data: unknown
}
interface api400Response {
  status: boolean
  message: string
}

interface apiResponse {
  status?: boolean
  message?: string
  data?: any
}

interface IRequestData extends FastifyRequest<IRequestData> {
  QueryStrings: any
  Params: any
  Body: any
  Headers: any
}

export { IRequestData, apiResponse, api200Response, api400Response }
