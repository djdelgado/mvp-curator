const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request-promise')
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://djdelgado:abcd1234@ds131782.mlab.com:31782/estylo', (err) => {
    if(err){console.log(err)}
    else {console.log('db connected')}
    
})
let Users = mongoose.Schema({
    username: String,
    password: String
});
let Artist = mongoose.Schema({
    name: String,
    likes: Number,
})

let user = mongoose.model('user', Users);

app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, function() {
    console.log(`Listening at ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/login', (req, res) => {
    console.log(req.body)
    user.find(req.body, (err, login) => {
        if(err){console.log(err)}
        console.log(login)
        if(!login[0]){
          new user(req.body).save(err => {
            if(err){console.log(err)}
            console.log('Posted!')
          });
        }
    });
    
})

let options = {
    method: 'GET',
    url: 'https://api.artsy.net/api/artists/andy-warhol',
    headers: {
        'X-Xapp-Token': process.env.ARTSY_TOKEN,
    }
}

// request(options)
//     .then((body) => {
//         console.log(JSON.parse(body), "infoooooooo")
//     })
//     .catch(err => {
//         console.log(err)
//     })