const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blog");
const User = require("../models/User")

const JWT_SECRET = "thisislordsvp";

//Route 1: Post a blog POST auth req.
router.post("/postBlog", fetchuser, async(req,res) =>{
    const user = await User.findOne({_id : req.id})
    // console.log(user)
    try {
        const blog = await Blog.create({
            userID: user.name,
            // userID: req.headers.userID -- get from front end using localStorage.getItem,
            title: req.body.title,
            blog: req.body.blog,
            image: req.img
        })        
        res.send('Blog posted successfully!!')
    } catch (error) {
        res.status(400).json(error.message)
    }

})

//Route 2: Delete a blog
router.delete('/deleteBlog/:id',fetchuser,async(req,res) =>{
    try {
        await Blog.findByIdAndDelete(req.params.id)
    res.send('Blog deleted')
    } catch (error) {
        res.send(error.message)
    }
})

//Route 3: Get all blogs posted by everyone
router.get('/feed',fetchuser,async(req,res) =>{
    try {
        const blogs = await Blog.find({})
        if (blogs != {}){
            res.json(blogs)
        }
        else{
            res.json("No blogs posted")
        }
    } catch (error) {
        res.send(error.message)
    }
})

//Route 4: Get specific user blogs
router.get('/getUserBlogs',fetchuser,async(req,res)=>{
    const user = await User.findOne({_id : req.id})
    try {
        const blogs = await Blog.find({"userID" : user.name})
        if(blogs){
            res.json(blogs)
        }
        else{
            res.send('No blogs found!')
        }
    } catch (error) {
        res.send(error.message)
    }
})

//Route 5: Edit blogs
router.put('/editblog/:id',fetchuser,async(req,res) =>{
    try {
        const {title,blog} = req.body;
    const editedBlog = {}
    if (title){
        editedBlog.title = title
    }
    if (blog){
        editedBlog.blog = blog
    }
    let eblog = await Blog.findOne({ _id: req.params.id });
    if (!eblog) {
      return res.status(404).send("note not found");
    }
    
    eblog =await Blog.findByIdAndUpdate({ _id: req.params.id },
    { $set: editedBlog },
    { new: true }
    )
    res.send(`blog updated ${eblog}`)

    } catch (error) {
        res.send(error.message)
    }

})

//Route 6: get a blog
router.get('/blogview',fetchuser,async(req,res) =>{
    try{
        blog = await Blog.findById(req.header("bID"))
        if(blog){
            res.send(blog)
        }
        else{
            res.status(404).send('Blog not found')
        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;