//dal.js

const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const wordsEasy = words.filter(w => w.length <= 5);
const wordsHard = words.filter(w => w.length >= 8);
const wordsNormal = words.filter(w => w.length > 5 && w.length < 8);


//gets random word from wordsEasy array
function getRandomEasyWord() {
  theWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];
  console.log(theWord);
  return theWord
}

//gets random word from wordsNormal array
function getRandomNormalWord() {
  theWord = wordsNormal[Math.floor(Math.random() * wordsNormal.length)];
  console.log(theWord);
  return theWord
}

//gets random word from wordsHard array
function getRandomHardWord() {
  theWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
  console.log(theWord);
  return theWord
}

//replaces the letters of theWord with dashes
function dashWord(wordSet) {
  console.log('hello');
  let theWordArr = wordSet.split('');
  let dashes = theWordArr.map(l => '_');
  console.log('mystery word = ', theWordArr)
  console.log('word in dashes = ', dashes)
  return dashes
}


//tracks the letters used during the round
function addLetters(guess, lettersGuessed) {
  let guessIndex = lettersGuessed.indexOf(guess)
    if (guessIndex == -1){
      lettersGuessed.push(guess)
    }
  return lettersGuessed
}


//turn dashes into letter if correct letter guessed
function compareGuess(guess, dashes, wrd, guessesLeft){
  let containsLetter = false
  for(let i=0; i<wrd.length; i++){
    if(wrd[i] == guess){
      dashes[i] = guess
      containsLetter = true;
    }
  }
  if(!containsLetter) {
    console.log('hiiiiiiii');
    guessesLeft -= 1;
  }
  return {
    display: dashes,
    guessesLeft: guessesLeft
  }
}

//guesses left counter


module.exports={
  getRandomHardWord, getRandomNormalWord, getRandomEasyWord, dashWord, addLetters, compareGuess
}
