var board = document.getElementById("game-board");
var resetButton = document.getElementById("reset-button");
var attemptsDisplay = document.getElementById("attempts");

var flipped = [];
var matched = [];
var cards = [];
var attempts = 0;

// initialize game
function initGame() {
  // maak array van 18 paren
  var values = [];
  for (var i=1;i<=18;i++) values.push(i);
  cards = values.concat(values); // totaal 36 kaarten
  cards.sort(function(){ return 0.5 - Math.random(); }); // shuffle

  board.innerHTML = "";
  flipped = [];
  matched = [];
  attempts = 0;
  attemptsDisplay.innerHTML = "Aantal pogingen: 0";

  // De lussen zijn gecombineerd om alle 36 kaarten direct toe te voegen aan het bord
  for (var i = 0; i < cards.length; i++) { // cards.length is 36
    var index = i;
    var card = document.createElement("div");
    card.className = "card";

    var inner = document.createElement("div");
    inner.className = "card-inner";
    inner.setAttribute("data-value", cards[index]);
    inner.onclick = flipCard;

    inner.style.backgroundImage = "url('images/back-logo.png')"; // Zorgt dat ze verborgen zijn bij reset

    card.appendChild(inner);
    board.appendChild(card); // Voeg de kaart direct toe aan het game-board
  }
}

// kaart omdraaien
function flipCard() {
  if (flipped.length<2 && matched.indexOf(this)===-1 && this.className.indexOf("flipped")===-1) {
    this.classList.add("flipped");
    this.style.backgroundImage = "url('images/"+this.getAttribute("data-value")+".jpg')";
    flipped.push(this);

    if (flipped.length===2) {
      attempts++;
      attemptsDisplay.innerHTML = "Aantal pogingen: "+attempts;
      setTimeout(checkMatch, 1000);
    }
  }
}

// check of kaarten matchen
function checkMatch() {
  var a = flipped[0];
  var b = flipped[1];

  if (a.getAttribute("data-value") === b.getAttribute("data-value")) {
    matched.push(a,b);
  } else {
    a.classList.remove("flipped");
    b.classList.remove("flipped");
    a.style.backgroundImage = "url('images/back-logo.png')";
    b.style.backgroundImage = "url('images/back-logo.png')";
  }

  flipped = [];

  if (matched.length === cards.length) {
    alert("Fantastisch! 🎉 Je hebt alles gevonden in "+attempts+" pogingen!");
  }
}

resetButton.onclick = initGame;
initGame();
