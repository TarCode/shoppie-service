import logger from '../logger/logger'
import { createLogger, transports } from 'winston'

jest.mock('winston', () => {
  const mFormat = {
    json: jest.fn(),
    simple: jest.fn(),
  }
  const mTransports = {
    Console: jest.fn(),
    File: jest.fn(),
  }
  const mLogger = {
    info: jest.fn(),
    add: jest.fn(),
  }
  return {
    format: mFormat,
    level: 'info',
    transports: mTransports,
    createLogger: jest.fn(() => mLogger),
  }
})

describe('logger', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should pass', () => {
    logger.info('Hello world')

    expect(transports.Console).toBeCalledTimes(1)
    expect(transports.File).toBeCalledWith({ filename: 'error.log', level: 'error' })
    expect(transports.File).toBeCalledWith({ filename: 'combined.log' })
    expect(createLogger).toBeCalledTimes(1)
  })
})
