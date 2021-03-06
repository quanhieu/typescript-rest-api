import 'source-map-support/register'
import 'dotenv/config'
import { init } from './infra/init'
import start from './server'
import './websocket'

async function run() {
  await init()
  await start()
}

run()
