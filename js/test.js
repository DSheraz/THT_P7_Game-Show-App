//variables
const overlay = document.querySelector("#overlay");
let status = document.querySelector(".start");
let title = document.querySelector(".title");
let reset = document.querySelector(".btn__reset");
const phrase = document.querySelector("#phrase");
const qwerty = document.querySelector("#qwerty");
const ul = document.querySelector("ul");
let tries = document.querySelectorAll(".tries img");
let missed = 0;
let gameOver = document.querySelector(".gameOver");

const phrases = {
                colors:
                ["blue","green","red","orange","yellow","magenta","aquamarine",
                "brown", "purple","violet","black","white","grey","pink"],
                numbers:
                ["one","two","three","four","five","six","seven",
                "eight", "nine","ten"],
              };
let hint = document.querySelector(".hint");

function randomHint(obj) {
    let random = Math.floor(Math.random()*Object.keys(obj).length);
    console.log(random);
    let idx = random;
    console.log(idx);
    var key = Object.keys(phrases)[idx];
    let value = phrases[key];


    return value;
}

//function to grab a random phrase from the phrases array.
function getRandomPhraseArray(arr){
  let array = arr(phrases);
  console.log(array);
  // let hintArray = hint[]
  //use math.random to generate a random number between 0 and array.length.
  let random = Math.floor(Math.random()*array.length);
  //use random to grab a random phrase in the array.
  let phrase = array[random];
  console.log(phrase);
  //split the letters inside the random phrase to produce an array of letters.
  let chars = phrase.split('');
  console.log("randomPhraseArray/" + chars);
  return chars;
}

getRandomPhraseArray(randomHint);
