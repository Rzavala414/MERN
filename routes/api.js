const express = require('express');
const Router = express.Router()
const BlogPost = require('../models/blogPost.js')


Router.get('/', (req, res) => {
  
    BlogPost.find({ })
     .then((data) =>{
         res.json(data)
     })
     .catch((error) =>{
         console.log('error: ', error)
     })
 });

Router.post('/save', (req,res) =>{
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save(error => {
        if(error){
            res.status(500).json({msg: 'Sorry, internal server errors'});
        }else{
            res.json({msg: 'your data has been saved!!!'});
        }
    });
  
});


module.exports = Router