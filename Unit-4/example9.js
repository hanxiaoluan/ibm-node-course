'use strict'
const fileProcessor = require('./file-processor')

const logger = require('./simple-logger')

logger.setLogLevel(logger.Level.TRACE)

const DATA_DIR = '../data'

const FILE_NAME = '1mWords.txt'

(function mainline(){
  const startTime = process.hrtime()
  logger.info('mainline(): BEGIN')
  let fileName = DATA_DIR + '/'+FILE_NAME
  logger.debug('mainline():Processing file: '+fileName + '...')
  fileProcessor.processFileBrokenPromise(fileName).then(outputFileName=>{
    logger.info('mainline:Success! File name is: '+ outputFileName,startTime)
  }).catch(err=>{
    logger.error('mainline:Something has gone horribly wrong: '+err.message)
  })
  logger.info('mainline():END',startTime)
})()