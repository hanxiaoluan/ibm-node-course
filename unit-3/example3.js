let fs = require("fs");
console.log("Starting program....");

let fileContents = fs.readFileSync("../data/50Words.txt", "utf8");
let numberOfWords = fileContents.split(/[ ,.\n]+/).length;
console.log("there is" + numberOfWords + "words in this file.");
console.log("Program has finished");
