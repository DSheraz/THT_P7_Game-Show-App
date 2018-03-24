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
let hint = document.querySelector(".hint");
const phrases = {
                'color':
                ["blue","green","red","orange","yellow","magenta","aquamarine",
                "brown","purple","violet","black","white","grey","pink"],
                'number':
                ["one","two","three","four","five","six","seven",
                "eight","nine","ten"],
                'social media':
                ["instagram","facebook","twitter","tumblr","snapchat","youtube",
                "whatsapp","skype","pinterest","linkedin"],
                'month':
                ["january","february","march","april","may","june","july",
                "august","september","october","november","december"]
              };

//function to choose the category/hint.
function randomHint(obj) {
    const random = Math.floor(Math.random()*Object.keys(obj).length);
    const idx = random;
    const key = Object.keys(phrases)[idx];
    const value = phrases[key];
    hint.textContent = "Hint: " + key;
    return value;
}

//function to grab a random phrase from the phrases array.
function getRandomPhraseArray(arr){
  let array = arr(phrases);
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

//function to display the random phrase.
function addPhraseToDisplay(arr){
  //loop through the chars array.
  for(let i=0; i<arr.length; i+=1){
    //create li inside #phrase ul.
    const li = document.createElement("li");
    //current letter
    const char = arr[i];
    //put char inside li.
    li.innerHTML = char;
    //append li to ul.
    ul.appendChild(li);
    //check if char is a letter or a space
    if(char != " "){
      li.className = "letter";
    }else {
      li.className = "space";
    }
  }
  //append ul to #phrase.
  phrase.appendChild(ul);
  return phrase;
}

//function to check if the button chosen match the letters in the phrase.
function checkLetter(e){
  const letter = document.querySelectorAll(".letter");
  //grabbing the textContent of button
  let click = e.textContent;
  //let matched to null if there's no match.
  let matched = null;
  //loop over the letters to check for a match.
    for(let i=0; i<letter.length; i+=1){
      //match = current letter
      let match = letter[i].textContent;
      //condition when match is found.
      if(click == match ){
        //set matched to the matched letter.
        matched = match;
        //add show class to the letter to display it.
        letter[i].classList.add("show");
      }
    }
    //return matched as null or the matched letter
    console.log("letter matched/" + matched);
    return matched;
}


//function to check for win or lose.
function checkWin(e) {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  //condition if phrase is completed or missed reached 5.
  if(show.length == letter.length || missed >= 5){
    gameOver.style.visibility = "visible";
    //removeEventListener after win/lose.
    qwerty.removeEventListener('click',run);
    //delay respond time for win/lose overlay
    setTimeout(function(){
      //display win/lose overlay and reset button
      overlay.style.display = "flex";
      reset.textContent = "Reset";
      //if phrase is completed/win.
      if(show.length == letter.length) {
        status.className = "win";
        title.textContent = "You won!";
        console.log("win");
      } else if (missed >= 5){          //if missed>=5/lose.
        status.className = "lose";
        title.textContent = "You lost!";
        console.log("lose");
      }
    },1000); //display after 1s.
  }
}

//function to detect event of keyboard and run the game.
function run(event) {
    const button = event.target;
    //targetting button only
    if(button.tagName == "BUTTON") {
      //add class chosen after button is clicked.
      button.className = "chosen";
      //disable the button after clicked.
      button.disabled = "true";
      //call function checkLetter.
      let letterFound = checkLetter(button);
      //if clicked on the wrong button
      if(letterFound === null){
        //display lostHeart.png.
        tries[missed].src = "images/lostHeart.png";
        //increase missed value by one.
        missed = missed + 1;
        console.log("missed/" + missed);
      }
    }
    //call function to check win/lose
    checkWin();
}

//addEventListener for reset.
reset.addEventListener('click', ()=> {
  //code for starting the game.
  if(reset.textContent == "Start Game"){
    // call the getRandomPhraseArray function
    let guess = getRandomPhraseArray(randomHint);
    // pass it to addPhraseToDisplay function.
    addPhraseToDisplay(guess);
    //set overplay display to none to display the game
    overlay.style.display = "none";
    //addEventListener to qwerty and run the game.
    qwerty.addEventListener('click',run);
  } else if (reset.textContent == "Reset"){       //code for resetting the game.
    //reload the document
    location.reload();
  }
});
