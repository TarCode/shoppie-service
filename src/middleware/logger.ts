import winston from 'winston'
import { ElasticsearchTransport, LogData } from 'winston-elasticsearch'
import { ELASTICSEARCH_URL } from '../constants/shoppie.constants'
import moment from 'moment'

const esTransportOpts = {
  level: 'info',
  index: 'logstash',
  indexSuffixPattern: 'YYYY-MM-DD HH:mm:ss',
  clientOpts: {
    node: ELASTICSEARCH_URL,
    log: 'info',
  },
  transformer: (logData: LogData) => {
    return {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
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

export default logger
