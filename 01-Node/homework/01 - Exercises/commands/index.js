const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

/* const write= (valor)=>{
    process.stdout.write(valor+ '\n')
    process.stdout.write('prompt > ');
} */

function pwd(print) {
        print(process.cwd().split("\\").at(-1))
}

function date(print) {
    print(Date())
}

function echo(print,args) {
    print(args)
    
}

function ls(print) {
    fs.readdir('./',(err,files)=>{ //'.' la carpeta donde estoy
        const text= files.join(' ')
        if(err) throw err
        print(text)
            })
}

function cat(print,filename) {
    fs.readFile('./' +filename, 'utf8',(error,file)=>{ //utf8 para q no muestre el buffer 53 56 23 60 etc
        print(file);
    })
}

function head(print,filename) {
    fs.readFile('./' +filename, 'utf8',(error,file)=>{
        print(file.split("\n").slice(0,1).join('\n'))
    })
}

function tail(print, filename) {
    fs.readFile('./' +filename, 'utf8',(error,file)=>{
        print(file.split("\n").slice(-1).join('\n').trim())
    })
}

function curl(print,args) {
    utils.request(args,(error,response)=>{
        if(error) throw err
        print(response)
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};