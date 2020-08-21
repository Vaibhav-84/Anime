const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();

const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Anime', {useNewUrlParser: true});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    question: String
  });
const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{

    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{

    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this data have been save to db ")
    }).catch(()=>{
        res.status(404).send("not send ")
    })
    res.status(200).render('contact.pug');
})




// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
