let fs = require("fs");
fs.readFile("../data/50Words.txt", "utf8", (error, data) => {
  if (error) throw error;
  let numberOfWords = data.split(/[ ,.\n]+/).length;
  console.log("there is " + numberOfWords + "words in this file.");
});
console.log("Program has finished");
