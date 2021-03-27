import fastify from 'fastify'
import logger from './utils/logger'
import autoload from 'fastify-autoload'
import path from 'path'
import ajv from './validations'
import config from './config'

const server = fastify({
  logger: false,
})

server.setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema)
})

server.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    logger.error(error)
    reply.status(422).send(new Error('validation failed'))
  } else {
    reply.status(500).send('Server errror')
  }
})

server.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: {
    prefix: '/api',
  },
})

async function start(): Promise<void> {
  const data = await server.listen(config.server_port as string, '0.0.0.0')
  logger.info(`Server listening at ${data}`)
}

export default start
