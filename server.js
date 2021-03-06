const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request-promise');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();


const Users = mongoose.Schema({
  username: String,
  password: String,
});

const Artists = mongoose.Schema({
  username: String,
  artist: String,
  likes: Number,
});

const User = mongoose.model('user', Users);
const Artist = mongoose.model('artist', Artists);

let userTag = '';

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'js')));

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
    console.log('db connected');
  }
});


app.get('/', (req, res) => {
    console.log(req.session)
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public/login.html'));
  }
});

app.get('/signup', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
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
        userTag = req.body.username;
        res.redirect('/');
      });
    }
  });
});

app.post('/signup', (req, res) => {
  new User(req.body).save((err) => {
    if (err) {
      console.error(err);
    } else {
      req.session.regenerate(() => {
        req.session.user = req.body.username;
        userTag = req.body.username;
        res.redirect('/');
      });
    }
  });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/userTag', (req, res) => {
  res.send(userTag);
});

app.post('/like', (req, res) => {
  let conditions = { username: userTag, artist: req.body.artist };
  let update = { $inc: { likes: 1 } };
  Artist.findOne(conditions, (err, found) => {
    if (err) { console.log(err); }
    if (!found) {
      new Artist({ username: userTag, artist: req.body.artist, likes: 1 })
        .save((e) => {
          if (e) { console.log(e); }
        });
    }
    Artist.update(conditions, update, (error, data) => {
      if (error) { console.log(error); }
      console.log(data, "like counter");
    });
  });
  res.end();
});

app.get('/grabArt', (req, res) => {
  const artistList = ['Pablo Picasso', 'Vincent van Gogh', 'Basquate', 'Rene Magritte', 'Leonardo da Vinci', 'Claude Monet', 'Salvador Dali', 'Henri Matisse', 'Rembrandt', 'Andy Warhol', 'Georgia OKeeffe', 'Michelangelo', 'Peter Paul Rubens', 'Edgar Degas', 'Caravaggio', 'Pierre-Auguste Renoir', 'Raphael', 'Paul Cezanne', 'Marc Chagall', 'Titian', 'Joan Miro', 'Jackson Pollock', 'Gustav Klimt', 'Albrecht Durer', 'Edward Hopper', 'Wassily Kandinsky', 'Jan Vermeer', 'Paul Klee', 'Edvard Munch', 'Goya', 'Janet Fish', 'Edouard Manet'];

  let artistName = artistList[Math.floor(Math.random() * artistList.length)];
  let i = Math.floor(Math.random() * 5);
  let options = {
    method: 'GET',
    uri: `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${artistName}+art`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KEY,
    },
  };

  request(options)
    .then((data) => {
      let body = JSON.parse(data);
      let img = body.value[i].contentUrl;
      let obj = { artist: artistName, image: img };
      res.send(obj);
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    });
});

app.get('/findLikes', (req, res) => {
  Artist.find({ username: userTag }, (err, found) => {
    res.send(found);
  });
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
app.get('/js/cat.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'js/cat.js'));
});

