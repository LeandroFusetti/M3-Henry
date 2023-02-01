const posts = [];


// to enable parsing of json bodies for post requests
/* server.use(express.json()); */
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
    posts.push(newPost)
    return newPost
    
}

const getPosts= (term)=>{
    if(term) {
        return filtrados= posts.filter(p=> p.title.include(term) || p.contents.include(term) )
        
     }else{
        return posts
     }

}
const getAuthorTitlePosts=(author,title)=>{
    const results= posts.filter(p=>p.author==author &&p.title==title)
    if(results.length)return results
    else throw Error("No existe ningun post con dicho titulo y autor indicado")


}
const getAuthorPosts=(author)=>{
    const results = posts.filter(p=>p.author==author)
    if(results.length)return results
    else throw Error("No existe ningun post del autor indicado")
}

const updatedPost=(id,title,contents)=>{
    if(!id||!title||!contents)throw Error("No se recibieron los parámetros necesarios para modificar el Post")
    const postToUpdate =posts.find(p=>p.id ==id)
    if(!postToUpdate)throw Error('un mensaje adecuado')
    postToUpdate.title=title
    postToUpdate.contents= contents
    return postToUpdate
}

const deleteForAuthor=(author)=>{
    if(!author)throw Error('No tengo author')
    const authorPosts= posts.filter(post=>post.author==author)
    if(!authorPosts.length)throw Error('No existe el autor indicado')

    posts= posts.filter(p=>p.author!= author)
}

const deletePost=(id)=>{
    if(!id)throw Error('No tengo id')
    const postToDelete= posts.find(p=>p.id==id)
    if(!postToDelete)throw Error('El post no existe')
    posts= posts.filter(p=>p.id != id)
    return posts
}

module.exports ={
    posts,
    deletePost,
    deleteForAuthor,
    updatedPost,
    getAuthorPosts,
    getAuthorTitlePosts,
    getPosts,
    createPost
}