const levelOne = (a, b) => {
    return a + b
};

const levelTwo = (letras) => {
    let array=[]
    if(letras.length<2) return letras
    if(letras.length==2)return letras[0]
    if(letras.length >2){
        for(let i=0; i<=letras.length;i++){
            if(!(i%2)){
                array.push(letras[i])
            }

            
        }
        return array.join('')

    }

};



const levelThree = (a, b) => {
    let array= a.concat(b)
    for(let i=0; i<=array.length-1; i++){
        
        for(let j=0; j<=array.length-1; j++){
            if(array[j]>array[j+1]){
                let aux= array[j]
                array[j]= array[j+1]
                array[j+1]=aux
            }
        }

    }
    return array

};


const levelFour = (num) => {
    
    let accu = 0
    let rev;
    num= num.toString()
    
    for(let i=0; i<=num.length-1;i++){
        accu += Number(num[i])
        
    }
    
    rev=accu
    if(num.length>1){
        console.log(num);
        rev= accu.toString().split('').reverse().join('')
        
    }
    return num == (rev * accu)
   
};

console.log(levelFour(1458))
module.exports = { levelOne, levelTwo, levelThree, levelFour };
