"use strict";
const fs = require("fs");
const crypto = require("crypto");
const logger = require("./simple-logger");
const KEY_LENGTH = 32;
const NUMBER_OF_ITERATIONS = 100000;
const SALT = "NaCl";
const DIGEST = "sha512";
function processFile(fileName, resultsCallback) {
  const startTime = process.hrtime();
  logger.trace("fs.readFile():START", startTime);
  fs.readFile(fileName, "utf8", (err, fileContents) => {
    if (err) throw err;
    logger.debug(
      "File read complete.File contents length:" + fileContents.length
    );
    crypto.pbkdf2(
      fileContents,
      SALT,
      NUMBER_OF_ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, derivedKey) => {
        var derivedKeysAsString;
        if (err) {
          logger.error("SomeThing went horribly wrong;" + err.message);
          throw err;
        } else {
          derivedKeysAsString = derivedKey.toString("hex");
          logger.debug(
            "crypto.pbkdf2(): Derived key: '" + derivedKeyAsString + "'",
            startTime
          );
        }
        resultsCallback(err, derivedKeysAsString);
      }
    );
    logger.trace("fs.readFile():END", startTime);
  });
}
function processFileSync(fileName) {
  let startTime = process.hrtime();
  logger.trace("processFileSync():START", startTime);
  let fileContents = fs.readFileSync(fileName, "utf8");
  let derivedKey = crypto.pbkdf2Sync(
    fileContents.toString(),
    SALT,
    NUMBER_OF_ITERATIONS,
    KEY_LENGTH,
    DIGEST
  );
  let derivedKeyAsString = derivedKey.toString("hex");
  logger.debug(
    "processFileSync():Computed hash: '" + derivedKeyAsString + "'",
    startTime
  );
  logger.trace("processFileSync():END", startTime);
  return derivedKeyAsString;
}
