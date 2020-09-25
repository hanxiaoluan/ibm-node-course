'use strict'

const PORT = 8080

const MS_TO_SLEEP = 20

const MS_TO_BURN = 2

const { stat } = require('fs')
const http = require('http')
const logger = require('./simple-logger')

const server = http.createServer((request, response) => {
  const { method, url } = request
  if (method === 'POST') {
    request.on('error', err => {
      logger.log('ERROR processing request: ' + err.message)
    })
    let startTime = Date.now()
    if (url === '/async') {
      setTimeout(() => {
        let endTime = Date.now()
        writeServerResponse(response, 'Server request complete in' + (endTime - startTime) + 'ms.\n', 200)
      }, MS_TO_SLEEP)
    } else if (url === '/sync') {
      let endTime = startTime
      while (endTime < startTime + MS_TO_BURN) { endTime = Date.now() }
      writeServerResponse(response, 'Server request complete in' + (endTime - startTime) + 'ms.\n', 200)
    } else {
      writeServerResponse(response, 'The requested URL \'' + url + '\' is not recognized.\nOnly one of these URLS:\n\t/processFile\n\t/processFileSync.\nPlease try your request again.\n', 404)
    }
  } else {
    writeServerResponse(response, 'Only POST method is allowed and either one of these URLS:\n\t/processFileSync.\n Please try your request again.\n', 400)
  }
  response.on('error',err=>{
    logger.log('ERROR on response: ' + err.message)
  })
}).listen(PORT)
const writeServerResponse  = (response,responseMessage,statusCode)=>{
  logger.debug(responseMessage)
  response.statusCode = statusCode
  response.write(responseMessage)
  response.end()
}
