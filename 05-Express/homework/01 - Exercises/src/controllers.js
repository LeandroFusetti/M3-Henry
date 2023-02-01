let publications = [];
let index= 1
//esta modularizado por eso no andan los tests
const createPost= (author,title,contents)=>{
    if(!author||!title ||!contents)throw Error(
            "No se recibieron los parámetros necesarios para crear la publicación"
        )
    const newPost={
        id:index++,
        author,
        title,
        contents
    } 
    ;
    publications.push(newPost)
    return newPost
    
}

const getPost=(author,title)=>{
    const results= publications.filter(p=>p.author==author&& p.title==title)
    console.log(publications);
    console.log(results);
    console.log(author);
    console.log(title);
    if(results.length)return results
    else throw Error("No existe ninguna publicación con dicho título y autor indicado")
}

const getAuthor=(author)=>{
    const results= publications.filter(p=>p.author ==author)
    if(results.length) return results
    else throw Error("No existe ningun post del autor indicado")
    
}

const updatePost=(id,title,contents)=>{
    if(!id||!title||!contents)throw Error("No se recibieron los parámetros necesarios para modificar la publicación")
    const results=publications.find(p=>p.id==id)
    if(!results){
        console.log(results);
        console.log(id);
        throw Error("No se recibió el id correcto necesario para modificar la publicación")
    }
    else{
        console.log(results);
        results.title=title
        results.contents= contents
        return results
    }
}

const deletePost= (id)=>{
    if(!id) throw Error("No se recibió el id de la publicación a eliminar")
    const results =publications.find(p=>p.id==id)
    if(!results) throw Error("No se recibió el id correcto necesario para eliminar la publicación")
    publications = publications.filter(p=>p.id!=id)
    return publications
}
module.exports={
    publications,
    createPost,
    getPost,
    getAuthor,
    updatePost,
    deletePost
}