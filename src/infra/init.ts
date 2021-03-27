import logger from '../utils/logger'
import { ping } from './elasticsearch'
import { connect } from './mongoose'

async function init(): Promise<void> {
  try {
    await Promise.all([connect(), ping()])
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

export { init }
