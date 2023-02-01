// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
const server = express();

const{
    posts,
    deletePost,
    deleteForAuthor,
    updatedPost,
    getAuthorPosts,
    getAuthorTitlePosts,
    getPosts,
    createPost
}= require('./controllers')
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

server.post('/posts',(req,res)=>{
    const{author,title,contents}= req.body
    try{
        const newPost= createPost(author,title,contents)
        res.status(200).json(newPost)
    }catch{
        res.status(STATUS_USER_ERROR ).json({error: error.message})

    }
})

server.post('/posts/author/:author',(req,res)=>{
    const{title,contents}= req.body
    const{author}=req.params
    try{
        const newPost= createPost(author,title,contents)
        res.status(200).json(newPost)
    }catch{
        res.status(STATUS_USER_ERROR ).json({error: error.message})

    }
})

server.get('/posts',(req,res)=>{
    const{term}= req.query
    const filter= getPosts(term)
    res.status(200).json(filter)
    
})


server.get('/posts/:author',(req,res)=>{
    const{author}=req.params
    try {
        const postAuthor=getAuthorPosts(author)
        res.status(200).json(postAuthor)
    } catch (error) {
        res.status(STATUS_USER_ERROR ).json({error:error.message})
    }
    
})

server.get('/posts/:author:/title',(req,res)=>{
    const{author,title}=req.params
    try {
        const postAuthor=getAuthorTitlePosts(author,title)
        res.status(200).json(postAuthor)
    } catch (error) {
        res.status(STATUS_USER_ERROR ).json({error:error.message})
    }
    
})

server.post('/posts',(req,res)=>{
    const{id,title,contents}= req.body
    try {
        const modificado= updatedPost(id,title,contents)
        res.status(200).json(modificado)
    } catch (error) {
        res.status(STATUS_USER_ERROR).json({error:error.message})
    }
})

server.delete('/posts',(req,res)=>{
    const{id}=req.body
    try {
        deletePost(id)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(STATUS_USER_ERROR).json({error:error.message})
    }
})

server.delete('/author',(req,res)=>{
    const{author}= req.body
    try {
        const deletePosts =deleteForAuthor(author)
        res.status(200).json({success:true})
    } catch (error) {
        res.status(STATUS_USER_ERROR).json({error:error.message})
    }
})

// TODO: your code to handle requests


module.exports = { posts, server };
