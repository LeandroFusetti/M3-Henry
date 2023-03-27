let fs = require("fs");
let chalk = require("chalk");
const { log } = require("console");

let utils = {};

utils.readFile = function (filename, callback) {
  let randExtraTime = Math.random() * 200;
  setTimeout(function () {
    fs.readFile(filename, function (err, buffer) {
      if (err) callback(err);
      else callback(null, buffer.toString());
    });
  }, randExtraTime);
};

utils.promisifiedReadFile = function (filename) {
  return new Promise(function (resolve, reject) {
    let readFileSync = fs.readFileSync(filename);
    if (!readFileSync) return reject("File not found");
    resolve(readFileSync.toString());
  });
};

utils.blue = function (text) {
  if (text !== undefined && text !== null) console.log(chalk.blue(text));
};

utils.magenta = function (text) {
  console.error(chalk.magenta(text));
};
async function problemA() {
    // callback version
   /*  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
      console.log("-- A. callback version --");
      exerciseUtils.blue(stanza);
    }); */
  
    // asyncawait version
    // Tu código acá:
    try {
        
        const stanza = await utils.promisifiedReadFile("poem-one/stanza-010.txt")
        utils.blue(stanza)
    } catch (error) {
        utils.magenta(error)
    }
  }
log(problemA()) 
console.log(utils);