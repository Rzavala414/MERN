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

Router.delete('/deleted')
module.exports = Router