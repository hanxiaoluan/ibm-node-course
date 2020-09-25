"use strict";

const {
  processFileSync
} = require("./file-processor");

const logger = require("./simple-logger");

logger.setLogLevel(logger.Level.DEBUG);

const DATA_DIR = "../data";

const FILE_NAME = "1mWords.txt";
(function mainline() {
  const startTime = process.hrtime();
  logger.info('mainLine(): Start processFile() calls... ***');
  let fileName = DATA_DIR + '/' + FILE_NAME;
  logger.debug('mainline(): Processing file: ' + fileName + '...');
  let derivedKeyAsString = processFileSync(fileName);
  logger.debug('mainline():Derived key as string: \'' + derivedKeyAsString + '\'');
  logger.info('mainline():End***', startTime);
})();