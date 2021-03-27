const userSignUpSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 1,
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
    required: ['email', 'password'],
  },
}

const searchUserSchema = {
  body: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
      },
      size: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
      },
      keyword: {
        type: 'string',
        default: '',
      },
    },
    additionalProperties: false,
  },
}

export { userSignUpSchema, searchUserSchema }
