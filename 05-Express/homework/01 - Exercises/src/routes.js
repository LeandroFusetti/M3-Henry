const { Router } = require("express")
const {createPost,getPost,getAuthor,updatePost,deletePost}= require('./controllers.js')
mainRouter=Router()
//esta modularizado por eso no andan los tests
mainRouter.post('/posts',(req,res)=>{
    const{author,title,contents}= req.body
    try{
        const newPost= createPost(author,title,contents)
        res.status(200).json(newPost)
        
    }catch(error){
        
        res.status(404).json({error:error.message})
        
    }
})


mainRouter.get('/posts',(req,res)=>{
    const{author,title}= req.query
    try {
        const posts= getPost(author,title)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

mainRouter.get('/posts/:author',(req,res)=>{
    const{author}= req.params
    try {
        const postAuthor= getAuthor(author)
        res.status(200).json(postAuthor)
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
})

mainRouter.put('/posts/:id',(req,res)=>{
    const{id}=req.params
    const{title,contents}=req.body
    try {
        const update=updatePost(id,title,contents)
        res.status(200).json(update)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

mainRouter.delete('/posts/:id',(req,res)=>{
    const{id}=req.params
    try {
        deletePost(id)
        res.status(200).json({sucess:"true"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

module.exports={
    mainRouter
}