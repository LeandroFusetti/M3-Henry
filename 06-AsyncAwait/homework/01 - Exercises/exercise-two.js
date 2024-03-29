"use strict";

const { log } = require("async");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // async await version
  // Tu código acá:
  const stanza= await Promise.all([exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")])
    
    exerciseUtils.blue(stanza[0])
    exerciseUtils.blue(stanza[1])
  
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:
  const promises= filenames.map((filename)=>{return exerciseUtils.promisifiedReadFile(filename)})
  const stanzas= await Promise.all(promises)
  stanzas.forEach(stanza =>{return exerciseUtils.blue(stanza)});
  
  

}

async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:
  const promises= filenames.map((filename)=>{return exerciseUtils.promisifiedReadFile(filename)})
  promises.forEach(async (promise) => {
    const stanza= await promise
    return exerciseUtils.blue(stanza)
  });
}

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
 /*  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  }); */

  // async await version
  // Tu código acá:

  const promises= filenames.map((filename)=>{return exerciseUtils.promisifiedReadFile(filename)})
  try {
    for(const promise of promises){
      const stanza= await promise
      return exerciseUtils.blue(stanza)
      
    }
  
  } catch (error) {
    exerciseUtils.magenta(error)
  }finally{
    console.log("done");
  }
  
}
