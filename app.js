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
  console.log('da word',req.session.wrd);
  req.session.display = dal.dashWord(req.session.wrd)
  req.session.lettersGuessed = []
  req.session.guessesLeft = 8
  console.log(req.session.display);
  console.log(req.session);

  res.redirect('game');
})

app.post('/normal', (req, res) => {
  req.session.wrd = dal.getRandomNormalWord();
  console.log('da word',req.session.wrd);
  req.session.display = dal.dashWord(req.session.wrd)
  req.session.lettersGuessed = []
  req.session.guessesLeft = 8
  console.log(req.session.display);
  res.redirect('game');
})

app.post('/hard', (req, res) => {
  req.session.wrd = dal.getRandomHardWord();
  console.log('da word',req.session.wrd);
  req.session.display = dal.dashWord(req.session.wrd)
  req.session.lettersGuessed = []
  req.session.guessesLeft = 8
  console.log(req.session.display);
  res.redirect('game');
})

app.get('/game', (req, res) => {

  const renderModel = {
    lettersGuessed: req.session.lettersGuessed,
    guessesLeft: req.session.guessesLeft,
    display: req.session.display
  }

  res.render('game', renderModel);
})


// letter submit
app.post('/game', (req, res) => {
  req.session.lettersGuessed = dal.addLetters(req.body.guess, req.session.lettersGuessed)

  let newGameState = dal.compareGuess(req.body.guess, req.session.display, req.session.wrd, req.session.guessesLeft)

  req.session.display = newGameState.display
  req.session.guessesLeft = newGameState.guessesLeft

  if(req.session.guessesLeft === 0){
    return res.render('lost')
  }
  if(req.session.display.indexOf('_') === -1){
    return res.send('you WIN!')
  }

  res.redirect('/game')
})

//letter submit, to be compared to letters stored in session; true = reveal, false = guesses-1




//port
app.set('port', 3000)

app.listen(3000, function () {
  console.log('vvrrrroooooooommmmmmmm!!')
})
