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

  for (var r=0;r<6;r++) {
    var row = document.createElement("div");
    row.className = "row";
    for (var c=0;c<6;c++) {
      var index = r*6 + c;
      var card = document.createElement("div");
      card.className = "card";

      var inner = document.createElement("div");
      inner.className = "card-inner";
      inner.setAttribute("data-value", cards[index]);
      inner.onclick = flipCard;

      card.appendChild(inner);
      row.appendChild(card);
    }
    board.appendChild(row);
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
