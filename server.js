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


app.listen(PORT, function() {
            console.log(`Listening at ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/login', (req, res) => {

})

let options = {
    method: 'GET',
    url: 'https://api.artsy.net/api/artist/andy-warhol',
    headers: {
        'X-Xapp-Token': process.env.ARTSY_TOKEN,
    }
}

request(options)
    .then((body) => {
        console.log(body, "infoooooooo")
    })
    .catch(err => {
        console.log(err)
    })