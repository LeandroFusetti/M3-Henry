const { stdout } = require("process");
const process = require("process");
const commands = require("./commands/index.js");

function bash() {
  process.stdout.write("prompt > ")
  process.stdin.on("data",(data)=>{
    let input = data.toString().trim().split(" ")
    let cmd= input.shift()//saca el ultimo elemento del array
    let args = input.join(" ")
    commands[cmd]? commands[cmd](print, args):print("command not found: "+cmd)
  })
}

function print(output){
  process.stdout.write(output)
  process.stdout.write("\nprompt > ")

}
bash();
module.exports = {
  print,
  bash,
};