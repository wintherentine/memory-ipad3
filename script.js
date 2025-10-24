var board = document.getElementById("game-board");
var resetButton = document.getElementById("reset-button");
var attemptsDisplay = document.getElementById("attempts");

var flipped = [];
var matched = [];
var cards = [];
var attempts = 0;

function initGame() {
  var values = [];
  for (var i=1;i<=18;i++) values.push(i); // 18 paren
  cards = values.concat(values); // 36 kaarten totaal
  cards.sort(function(){ return 0.5 - Math.random(); });

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
      card.style.backgroundImage = "url('images/back.jpg')";
      card.setAttribute("data-value", cards[index]);
      card.onclick = flipCard;
      row.appendChild(card);
    }
    board.appendChild(row);
  }
}

function flipCard() {
  if (flipped.length<2 && this.className.indexOf("flipped")===-1 && matched.indexOf(this)===-1) {
    this.className += " flipped";
    this.style.backgroundImage = "url('images/"+this.getAttribute("data-value")+".jpg')";
    flipped.push(this);

    if (flipped.length===2) {
      attempts++;
      attemptsDisplay.innerHTML = "Aantal pogingen: "+attempts;
      setTimeout(checkMatch, 1000); // 1 seconde foute combinaties
    }
  }
}

function checkMatch() {
  var a = flipped[0];
  var b = flipped[1];
  if (a.getAttribute("data-value") === b.getAttribute("data-value")) {
    matched.push(a,b);
  } else {
    a.className = "card";
    b.className = "card";
    a.style.backgroundImage = "url('images/back.jpg')";
    b.style.backgroundImage = "url('images/back.jpg')";
  }
  flipped = [];
  if (matched.length === cards.length) {
    alert("Fantastisch! 🎉 Je hebt alles gevonden in "+attempts+" pogingen!");
  }
}

resetButton.onclick = initGame;
initGame();
