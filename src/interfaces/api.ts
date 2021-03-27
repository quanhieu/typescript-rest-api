export interface api200Response {
  status: boolean
  data: unknown
}
export interface api400Response {
  status: boolean
  message: string
}

export interface apiResponse {
  status?: boolean
  message?: string
  data?: any
}
