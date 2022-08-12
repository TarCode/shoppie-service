import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 8080
export const TOKEN_KEY = 'Tseppie'
export const MONGO_URL = process.env.MONGO_URI || 'mongodb://mongo:27017/Shoppie'
export const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://es:9200'
