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

  // FIX: GEEN RIJ-ELEMENTEN MEER. Voeg alle 36 kaarten direct toe aan het bord.
  for (var i = 0; i < cards.length; i++) { 
    var index = i; 
    var card = document.createElement("div");
    card.className = "card";

    var inner = document.createElement("div");
    inner.className = "card-inner";
    inner.setAttribute("data-value", cards[index]);
    inner.onclick = flipCard;

    // Zorgt ervoor dat de achtergrond bij reset correct is
    inner.style.backgroundImage = "url('images/back-logo.png')"; 

    card.appendChild(inner);
    board.appendChild(card); // Kaart direct toevoegen aan het game-board
  }
}

// kaart omdraaien
function flipCard() {
  // Controleert of er al minder dan 2 kaarten omgedraaid zijn, of de kaart al gematcht is, of al omgedraaid is.
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
    // Verwijder de flipped class en herstel de achtergrond
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
