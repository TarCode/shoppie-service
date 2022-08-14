import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      //we also log to console if we're not in production
      format: winston.format.simple(),
    }),
  )
}

export default logger
