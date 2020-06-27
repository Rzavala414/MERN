const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>{
    console.log('mongoose connected')
})

//Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

//Saving data to our mongo database
const data = {
    title:'Welcome',
    body: 'We are testing the model in the body and tile'
}

const newBlogPost = new BlogPost(data); // instance of the model

newBlogPost.save(error => {
    if(error){
        console.log('oooopss someting wnet wong')
    }else{
        console.log('everyting okay')
    }
})
//.save():

app.get('/api', (req, res) => {
    const data = {
        username: 'ArcherSterling',
        age: 34
    }
    res.status(200).json(data);
});

app.get('/api/name', (req, res) => {
    const data = {
        username: 'BobBeltcher',
        age: 43
    }
    res.json(data);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))