const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request-promise');
const session = require('express-session');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, (err) => {
  if(err){
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
    console.log('db connected')};   
});

const Users = mongoose.Schema({
  username: String,
  password: String
});
const Artist = mongoose.Schema({
  name: String,
  likes: Number,
});

let user = mongoose.model('user', Users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.get('/login', (req, res) => {
  console.log(req.body)
  user.find(req.body, (err, login) => {
    if(err){console.log(err)}
    console.log(login)
    if(!login[0]){
      res.sendFile(__dirname + '/public/login.html');
    } else {
      res.sendFile(__dirname + '/index.html');
    }
  });
});

app.post('/signup', (req, res) => {
  new user(req.body).save(err => {
    if(err){console.log(err)}
    console.log('Posted!')
    res.sendFile(__dirname + '/index.html')
  });
});

// let options = {
//     method: 'GET',
//     url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
//     headers: {
//         'Ocp-Apim-Subscription-Key': process.env.KEY,
//     },
//     params: {
//         q: 'Basquiat'
//     }
// }

// request(options)
//     .then((body) => {
//         console.log(JSON.parse(body), "infoooooooo")
//     })
//     .catch(err => {
//         console.log(err)
//     })