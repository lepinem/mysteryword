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

//middleware
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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



//port
app.set('port', 3000)

app.listen(3000, function () {
  console.log('vvrrrroooooooommmmmmmm!!')
})
