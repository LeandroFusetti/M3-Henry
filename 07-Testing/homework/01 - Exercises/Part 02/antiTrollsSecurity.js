const antiTrollsSecurity = (string) => {

    let array = string.split('')
    
    let eliminaVocales= (x)=>{
        
        if(x=="a"|| x=="e" || x =="i" || x =="o"|| x=="u" || x=="A"|| x=="E" || x =="I" || x =="O"|| x=="U"){
            x=""
            return x
        }   else return x
    }

    let sinVoc = array.map(eliminaVocales)
    
      return sinVoc.join("")
   

};// tambien se puede hacer con el metodo replace()


module.exports = antiTrollsSecurity;

