//TODO:
// Add a button that when clicked will start the game
// Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
// Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images!
//Styling- smoother transitions, custom fonts, rounded corners, etc.

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let clickCount = 0
const countDisplay = document.querySelector("span")
const clickedDivs = document.getElementsByClassName("clicked")

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
 // you can use event.target to see which element was clicked
function handleCardClick(event) {
    if(document.getElementsByClassName("clicked").length < 2 && event.target.className.indexOf("matched") === -1 && event.target.className.indexOf("clicked") === -1){
        clickCount++;
        countDisplay.textContent = "Number of clicks: " + clickCount.toString();
        event.target.classList.toggle("clicked");
        if(document.getElementsByClassName("clicked").length === 2){
            if (clickedDivs[0].className === clickedDivs[1].className){
                clickedDivs[0].classList.add("matched");
                clickedDivs[1].classList.add("matched");
                }
                setTimeout(function(){
                    event.target.classList.toggle("clicked"); 
                    }, 1000);
        } else{
            setTimeout(function(){
                event.target.classList.toggle("clicked"); 
            }, 1000);
        }
    }   

if(document.getElementsByClassName("matched").length === 10){
    countDisplay.textContent = "CONGRATS! YOU WON IN " + clickCount.toString() + " CLICKS!";
    let playAgain = document.createElement("button");
    playAgain.textContent = "Play Again?";
    countDisplay.appendChild(playAgain);
    playAgain.addEventListener("click", function(){
        while (gameContainer.firstChild){
            gameContainer.removeChild(gameContainer.firstChild)
        }
        clickCount = 0;
        shuffle(COLORS);
        createDivsForColors(shuffledColors);
        playAgain.remove();
        countDisplay.textContent = "Number of clicks: " + clickCount.toString();
        });
    }
}


// when the DOM loads
createDivsForColors(shuffledColors);

