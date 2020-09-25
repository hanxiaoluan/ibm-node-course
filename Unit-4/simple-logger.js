"use strict";

const Level = {
  TRACE: { priority: 0, outputString: "TRACE" },
  DEBUG: { priority: 100, outputString: "DEBUG" },
  INFO: { priority: 200, outputString: "INFO" },
  WARN: { priority: 300, outputString: "WARN" },
  ERROR: { priority: 400, outputString: "ERROR" },
  FATAL: { priority: 500, outputString: "FATAL" },
  OFF: { priority: 1000, outputString: "OFF" },
};
/* the current log level */
let logLevel = Level.INFO;

function log(messageLogLevel, message, startTime) {
  if (messageLogLevel.priority >= logLevel.priority) {
    let now = Date.now();
    let outputString = now.toString() + ":" + messageLogLevel.outputString;
    let computedMessage;
    if (startTime) {
      let stopTime = process.hrtime(startTime);
      computedMessage =
        outputString +
        ":" +
        message +
        ":(elapsed time:)" +
        `${1000 * (stopTime[ 0 ] + stopTime[ 1 ] / 1e9)}` +
        "ms";
    } else {
      computedMessage = outputString + ":" + message;
    }
    console.log(computedMessage);
  }
}
function setLogLevel(newLevel) {
  logLevel = newLevel;
}

function trace(message, startTime) {
  log(Level.TRACE, message, startTime);
}
function debug(message, startTime) {
  log(Level.DEBUG, message, startTime);
}
function info(message, startTime) {
  log(Level.INFO, message, startTime);
}
function warn(message, startTime) {
  log(Level, WARN, message, startTime);
}
function fatal(message, startTime) {
  log(Level.FATAL, message, startTime);
}
/* setup the exports-these are the fixtures that are to be made available to other modules */
module.exports.Level = Level;
module.exports.setLogLevel = setLogLevel;
module.exports.trace = trace;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.fatal = fatal;
