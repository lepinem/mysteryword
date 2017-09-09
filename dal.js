//dal.js

const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const wordsEasy = words.filter(w => w.length <= 5);
const wordsHard = words.filter(w => w.length >= 8);
const wordsNormal = words.filter(w => w.length > 5 && w.length < 8);
// let theWord = '';
// let theWordArr = theWord.split('');
// let dashWord = theWordArr.map(l => '_');
// const theSpaces = dashWord().split('');
// let letters = [];
// let guess = '';
// let guessesLeft = 8;
// let dashes = [];

//gets random word from wordsEasy array
function getRandomEasyWord() {
  theWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];
  console.log(theWord);
}

//gets random word from wordsNormal array
function getRandomNormalWord() {
  theWord = wordsNormal[Math.floor(Math.random() * wordsNormal.length)];
  console.log(theWord);
}

//gets random word from wordsHard array
function getRandomHardWord() {
  theWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
  console.log(theWord);
}

//replaces the letters of theWord with dashes
function dashWord() {
  let theWordArr = theWord.split('');
  let dashes = theWordArr.map(l => '_');
  console.log(theWordArr, dashes)
}

//tracks the letters used during the round
function addLetters(guess) {
  letters.push(guess);
  console.log(letters)
    return letters;
}


module.exports={
  getRandomHardWord, getRandomNormalWord, getRandomEasyWord, dashWord, addLetters
}
