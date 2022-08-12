import winston from 'winston'
import { ElasticsearchTransport } from 'winston-elasticsearch'

export const logging = () => {
  const esTransportOpts = {
    level: 'info',
  }

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'logfile.log', level: 'error' }), //save errors on file
      new ElasticsearchTransport(esTransportOpts), //everything info and above goes to elastic
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
}
