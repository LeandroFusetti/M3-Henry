'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise (executor){
    if(typeof executor !=='function')
        throw TypeError('executor must be a function')
        this._state='pending'
        this._value=undefined
        this._handlerGroups=[]
        executor(this._internalResolve.bind(this),this._internalReject.bind(this))
        
}
$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length){
        const group= this._handlerGroups.shift()    
        if(this._state=== 'fulfilled'){
           //NO TENGO SUCCESS HANDLER
            if(group.successCb){
                try {
                    const result=group.successCb(this._value) //o es una promesa o es un valor
                    // 1 - RETOMAMOS UNA PROMESA
                    if(result instanceof $Promise){ //si me devuelve una promesa que es igual
                    return result.then(
                        value=>group.downstreamPromise._internalResolve(value),
                        reason=>group.downstreamPromise._internalReject(reason)
                    )
                }else{
                    // 2 - RETOMAMOS UN VALOR
                    group.downstreamPromise._internalResolve(result) //se resuelve a ese valor porque aca resolve seria un valor
                }
                } catch (error) {
                    // 3 - ARROJAMOS UN ERROR
                    group.downstreamPromise._internalReject(error)
                }
                
            }else{
                group.downstreamPromise._internalResolve(this._value)
            }
        }else if(this._state=== 'rejected'){
            if(group.errorCb){
                try {
                    const result=group.errorCb(this._value) //o es una promesa o es un valor
                    if(result instanceof $Promise){ //si me devuelve una promesa que es igual
                    return result.then(
                        value=>group.downstreamPromise._internalResolve(value),
                        reason=>group.downstreamPromise._internalReject(reason)
                    )
                }else{
                    group.downstreamPromise._internalResolve(result) //se resuelve a ese valor porque aca resolve seria un valor
                }
                } catch (error) {
                    group.downstreamPromise._internalReject(error)
                }
            }else{
                group.downstreamPromise._internalReject(this._value)
                
            }
        }
    }
}
$Promise.prototype._internalResolve= function(data){
    if(this._state=='pending'){
        this._state= 'fulfilled'
        this._value=data
        this._callHandlers()
    }
}

$Promise.prototype.catch= function(errorCb){
    return this.then(null, errorCb)
}

$Promise.prototype._internalReject= function(reason){
    if(this._state=='pending'){
        this._state= 'rejected'
        this._value=reason
        this._callHandlers()

    }
}
$Promise.prototype.then= function(successCb, errorCb){
    const downstreamPromise= new $Promise(()=>{})
    this._handlerGroups.push({
        successCb: typeof successCb== 'function'? successCb:false,
        errorCb: typeof errorCb== 'function'? errorCb:false,
        downstreamPromise
    })
    if(this._state !=='pending')this._callHandlers(this._value)
    return downstreamPromise
}

/* const promesaA = new $Promise((resolve,reject)=>{reject('hola')})

promesaA.then(null,error=>{
    console.log(error);
})
console.log(promesaA); */
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
