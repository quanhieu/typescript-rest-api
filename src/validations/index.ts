import Ajv from 'ajv'
import logger from '../utils/logger'
import addFormats from 'ajv-formats'

const ajv = new Ajv({
  logger: {
    log: logger.info,
    warn: logger.warn,
    error: logger.error,
  },
  useDefaults: true,
})

addFormats(ajv)

export default ajv
