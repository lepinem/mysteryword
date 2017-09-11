//app.js

//globals and dependencies
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const jest = require('jest');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const app = express();
const dal = require('./dal');

//view engine and midware
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
app.use(
  session({
    secret: 'jammyjam',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  })
)

//routes
app.get('/', (req, res) => {
  res.render('level');
})

app.post('/easy', (req, res) => {
  req.session.wrd = dal.getRandomEasyWord();
  res.redirect('game');
})

app.post('/normal', (req, res) => {
  req.session.wrd = dal.getRandomNormalWord();
  res.redirect('game');
})

app.post('/hard', (req, res) => {
  req.session.wrd = dal.getRandomHardWord();
  res.redirect('game');
})

app.get('/game', (req, res) => {
  const word = req.session
  req.body.wrd = dal.dashWord(req.session.wrd);
  // guessesLeft = 8;
  res.render('game');
})

// letter submit
app.post('/game', (req, res) => {
  dal.addLetters(req.body.guess)
  res.redirect('/game')
})

//letter submit, to be compared to letters stored in session; true = reveal, false = guesses-1




//port
app.set('port', 3000)

app.listen(3000, function () {
  console.log('vvrrrroooooooommmmmmmm!!')
})
