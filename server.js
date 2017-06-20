const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request-promise');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
    console.log('db connected');
  }
});

const Users = mongoose.Schema({
  username: String,
  password: String,
});
const Artist = mongoose.Schema({
  name: String,
  likes: Number,
});

const User = mongoose.model('user', Users);
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/static', express.static('/js'));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public/login.html'));
  }
});

app.get('/js/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'js/app.js'));
});
app.get('/js/service.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'js/service.js'));
});
app.get('/js/images.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'js/images.js'));
});

app.get('/signup', (req, res) => {
  if (req.session.user) {
    res.dedirect('/');
  } else {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
  }
});

app.post('/login', (req, res) => {
  User.find(req.body, (err, login) => {
    if (err) {
      console.log(err);
    }
    if (!login[0]) {
      res.sendFile(path.join(__dirname, 'public/login.html'));
    } else {
      req.session.regenerate(() => {
        req.session.user = req.body.username;
        res.redirect('/');
      });
    }
  });
});

app.post('/signup', (req, res) => {
  new User(req.body).save((err) => {
    if (err) {
      console.error(err);
    }
    console.log('Posted!');
    req.session.regenerate(() => {
      req.session.user = req.body.username;
      res.redirect('/');
    });
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