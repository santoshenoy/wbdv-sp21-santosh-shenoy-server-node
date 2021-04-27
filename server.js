const express = require('express')
const app = express()
// Connect this to Atlas
const MONGODB_URI = process.env.MONGODB_URI

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Use mongoose to connect to a Mongo database
const mongoose = require('mongoose');
const mongoAtlasUri = 'mongodb+srv://santoshenoy:santosh@12345@cluster0.r3dxd.mongodb.net/whiteboard?retryWrites=true&w=majority&ssl=true';
try {
    // Connect to the MongoDB cluster
    mongoose.connect(mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

mongoose.connection.on('connected', () => {
    console.log('Connected to DB')
})

//    mongoose.connect('mongodb+srv://santoshenoy:santosh@12345@cluster0.r3dxd.mongodb.net/test',
  //  {useNewUrlParser: true, useUnifiedTopology: true});

// Configure CORS (setting access)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require('./controllers/quizzes-controller')(app)
require('./controllers/questions-controller')(app)
require('./controllers/quiz-attempts-controller')(app)

//require('dotenv').config();
//app.listen(process.env.PORT || 3001);
app.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})