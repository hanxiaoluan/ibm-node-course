'use strict'

const PORT = 8000;
const DATA_DIR = '../data';

const FILE_NAME = '1mWords.txt';

const http = require('http');

const logger = require('./simple-logger');

const fileProcessor = require('./file-processor');

const server = http.createServer((request, response) => {
  //request processor
  //get the method and url from the request
  const { method, url } = request;
  if (method === 'POST') {
    request.on('error', err => {
      logger.error('ERROR processing request: ' + err.message);
    })
    if (url === '/processFile') {
      fileProcessor.processFile(DATA_DIR + '/' + FILE_NAME, (err, derivedKeyAsString) => {
        if (err) {
          logger.error('Something has gone horribly wrong: ' + err.message);
        } else {
          writeServerResponse(response, 'File contents:\n' + derivedKeyAsString, 200);
        }
      })
    } else if (url == '/processFileSync') {
      let derivedKeyAsString = fileProcessor.processFileSync(DATA_DIR + '/' + FILE_NAME);
      writeServerResponse(response, 'File contents:\n' + derivedKeyAsString, 200);
    } else {
      writeServerResponse(response, 'The requested URL \'' + url + '\'is not recognized.\nOnly one of these URLS:\n\t/processFile\n\t/processFileSync.\nPlease try your request again.\n', 404);
    }

  } else {
    writeServerResponse(response, 'Only POST method is allowed and either one of these URLS:\n\t/processFile\n\t/processFileSync.\nPelase try your request again.\n', 400);
  }
  response.on('error', err => {
    logger.error('ERROR on response: ' + err.message);
  });
}).listen(PORT);

/**
 * @param response
 * @param responseMessage
 * @param statusCode
 */

var writeServerResponse = function (response, responseMessage, statusCode) {
  logger.debug(responseMessage);
  response.statusCode = statusCode;
  response.write(responseMessage);
  response.end();
}