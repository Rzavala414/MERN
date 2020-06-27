const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api.js');


mongoose.connect('mongodb://localhost/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>{
    console.log('mongoose connected')
})



app.use(morgan('dev'));
app.use('/api', routes)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))