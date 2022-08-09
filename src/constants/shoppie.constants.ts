import { config } from 'dotenv'

config()

export const PORT = 80
export const TOKEN_KEY = 'Tseppie'
export const MONGO_URL = process.env.MONGO_URI || 'mongodb://mongo:27017/Shoppie'
