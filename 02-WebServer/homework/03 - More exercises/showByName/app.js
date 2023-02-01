var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req,res)=>{
    const name = req.url.slice(1)
    try{
        const img = fs.readFileSync(__dirname + `/images/${name}_doge.jpg`,)
        res.writeHead(200,{'Content-Type':'image/jpg'})

        res.end(img)
    }catch(error){
        res.writeHead(400,{'Content-Type':'text/plain'})
        res.end(`No existe el doge ${name}`)
        
    }
    
}).listen(3000,()=>console.log('http://localhost:3000'))