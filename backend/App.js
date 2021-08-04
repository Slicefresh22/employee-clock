// Written by: Nemese Kalubi
// Date: Thur, July 29th, 2021

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

const dbConnection = require('./dbConnection');
const { AppService} = require('./Services/AppService')
const { AuthService } = require('./Services/AuthService');


const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 3000;

// create app and applying midleware
const app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(cors());

// routes 
app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    AuthService.login(username, password)
    .then(token => {
       res.send(token);
    })
    .catch(err => {
        res.send(err);
    })
})

app.post('/verify', (req, res) => {
   const { authorization: jwt} = req.headers;
   const token = jwt.split(' ')[1];
   AuthService.verifyJWT(token).then(result => {
      res.send(result);
   }).catch(err => {
       res.send(false);
   })
})

app.post('/createuser', (req, res) => {
    const newUser = req.body;
    AppService.createUser(newUser).then(result => {
        res.send(result);
    })
})

// creating a server
const server = app.listen(PORT, ()=> {
    console.log(`server listening at localhost on port ${PORT}`);
})