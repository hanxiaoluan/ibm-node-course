'use strict'
const {
  hrtime
} = require('process');
const {
  processFile
} = require('./file-processor');
const logger = require('./simple-logger');

logger.setLogLevel(logger.Level.DEBUG);

const DATA_DIR = '../data';

const FILE_NAME = '1mWords.txt';

(function mainline() {
  const startTime = process.hrtime();
  logger.debug('mainline(): Start... ***', startTime);
  let fileName = DATA_DIR + '/' + FILE_NAME;
  logger.debug('mainline(): Processing file: ' + fileName + '...');
  processFile(fileName, (err, derivedKeyAsString) => {
    if (err) {
      logger.error('something has gone horribly wrong: ' + err.message);
    }
    logger.info('(callback)():Derived key as string:\'' + derivedKeyAsString + '\'', startTime);
  });
  logger.info('mainline():End. *** ', startTime);
})();