// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// set evrthing to zero at the first
// Add click event handler to card
//time out functio given by the proffessor

let cards_array = [];
let curr_card = 0;
let moves = 0;

function hide_card(card) {
  card.classList.remove("show");
}

function add_card_click(card) {
  card.addEventListener("click", function (e) {
    if (e.target.classList.contains("card") && document.getElementsByClassName("show").length == 0 && !e.target.classList.contains("matched") && !e.target.classList.contains("show")) {
      e.target.classList.add("show");
      increment_moves();
      if (e.target.innerHTML == document.getElementById("next-card").innerHTML) {
        e.target.classList.add("matched")
        incement_next_card();
        increment_score();
        check_win();
      }
    }
  
    setTimeout(hide_card, 500, e.target);
  });
}


// function for total score
// function for total moves
//next winner

// function for winner check at the last
//onload function for initialise event listener
//matched or unmatched cards shower
//shuffle cards

function increment_score() {
  document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 1;
}

function increment_moves() {
  moves += 1;
  document.getElementById("moves").innerHTML = moves;
}

function incement_next_card() {
  curr_card += 1;
  if (curr_card < cards_array.length) {
    document.getElementById("next-card").innerHTML = cards_array[curr_card];
  }
}

function check_win() {
  if (document.getElementsByClassName("matched").length == cards_array.length) {
    alert("You won!!\nMoves: " + moves);
  }
}


window.onload = function () {
  initalize();
  document.getElementsByClassName("restart")[0].addEventListener("click", function (e) {
    initalize();
  })

};

function initalize() {
  for (let card of document.getElementsByClassName("card")) {
    cards_array.push(card.innerHTML);
    add_card_click(card);
    card.classList.remove("show");
    card.classList.remove("matched");
  }

  // Set score to 0
  document.getElementById("score").innerHTML = 0;

  // Shuffle cards
  cards_array = shuffle(cards_array);
  curr_card = 0;
  document.getElementById("next-card").innerHTML = cards_array[0];

  moves = 0;
  document.getElementById("moves").innerHTML = 0;
}