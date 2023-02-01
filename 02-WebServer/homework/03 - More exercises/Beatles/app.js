var http = require('http');
var fs   = require('fs');

http.createServer((req,res)=>{
  const splited= req.url.split('/').slice(1)
  splited[0]=="api" 
    ? apiController(splited[1],res)
    : viewController(splited[0],res)
    
}).listen(3000,'localhost')

const apiController=(name,res)=>{
  if(!name){
    sendJson(200,beatles,res)
  }else{
    const beatle=findBeatle(name)
    beatle 
      ? sendJson(200,beatle,res)
      : sendJson(404,{error: "Beatle not found"},res)
        
  }
}

const findBeatle= (name)=>{
  const fullName= name.replace("%20"," ")
    return beatles.find(b=>b.name ==fullName)
}

const viewController=(name,res)=>{
  if(!name){
    const index = fs.readFileSync('index.html')
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end(index)
  }else{
    const beatle =findBeatle(name)
    let html =fs.readFileSync('./beatle.html', 'utf8')
    html= html.replaceAll('{nombre}',beatle?.name)
    html= html.replace('{cumpleaños}',beatle?.birthdate)
    html= html.replace('{profilePic',beatle?.profilePic)
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end(html)
  }
}

const sendJson = (status,content,res)=>{
  res.writeHead(status,{'Content-Type':'application/json'})
  res.end(JSON.stringify(content))
}

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
  
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
  

},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
