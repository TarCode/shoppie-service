import { Request } from 'express'

import logger from './logger'

export const logError = (req: Request, code: number, message: string) => {
  logger.error(`${code} || ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
}

export const logSuccess = (req: Request, code: number, message: string) => {
  logger.info(`${code} || ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
}
