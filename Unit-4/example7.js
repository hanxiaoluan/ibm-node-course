'use strict'

cosnt { processFilePyramid } = require('./file-processor')
const logger = require('./simple-logger')

logger.setLogLevel(logger.Level.TRACE)

const DATA_DIR = '../data'

const FILE_NAME = '1mWords.txt'

(function mainline() {
  const startTime = process.hrtime()
  logger.info('mainline(): Start... ***', startTIme)
  let fileName = DATA_DIR + '/' + FILE_NAME
  logger.debug('mainline(): Processing file: ' + fileName + '...', startTime)
  processFilePyramid(fileName, (err, outputFileName) => {
    if (err) {
      logger.error('Something has gone horribly wrong:' + err.message)
    } else {
      logger.info('(anonymous resluts callback():Output file name: \'' + outputFileName + '\'', startTime)
    }
  })
  logger.info('mainline(): End.***', startTime)
})()