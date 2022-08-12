import winston from 'winston'
import { ElasticsearchTransport, LogData } from 'winston-elasticsearch'
import { ELASTICSEARCH_URL } from '../constants/shoppie.constants'

export const logging = () => {
  const esTransportOpts = {
    level: 'info',
    clientOpts: {
      node: ELASTICSEARCH_URL,
      log: 'info',
    },
    transformer: (logData: LogData) => {
      return {
        '@timestamp': new Date().getTime(),
        severity: logData.level,
        message: `[${logData.level}] LOG Message: ${logData.message}`,
        fields: {},
      }
    },
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
