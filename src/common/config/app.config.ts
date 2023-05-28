import 'dotenv/config'

export const PORT = process.argv.slice(2)[0] || process.env.PORT || 3000
export const ENVIRONMENT = process.env.NODE_ENV
export const ENVIRONMENT_ACRONYMS = process.env.NODE_ENV_ACRONYMS || ''
export const PREFIX_PATH = process.env.PREFIX_PATH || ''
export const PREFIX_WEBSOCKET = process.env.PREFIX_WEBSOCKET || ''
export const TIME_ZONE = process.env.TIME_ZONE || 'Asia/Ho_Chi_Minh'

console.log('WHO_AM_I ', process.env.WHO_AM_I)

export default {
  PORT,
  ENVIRONMENT,
  ENVIRONMENT_ACRONYMS,
  PREFIX_PATH,
  PREFIX_WEBSOCKET,
  TIME_ZONE,
}
