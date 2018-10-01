
$(function() {
  var playerOneTurn = true;
  $("#player-one-roll").on("click", function() {
    var animationName = 'animated tada';
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $("#dice-pic").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  });
  $("#player-one-roll").click(function(event) {
    event.preventDefault();
    var sixSidedDiceRoll = sixSidedDice.roll();
    playerOne.setLastRoll(sixSidedDiceRoll);
    playerOne.resetRunningTotalOnOne(sixSidedDiceRoll);
    playerOne.addRollToArray(sixSidedDiceRoll);
    playerOne.sumOfRolls();

    $("#player-one-running").html("<h1 class='running-total'>" + playerOne.turnRunningScore + "</h1>");
    if (sixSidedDiceRoll === 1) {
      $("#dice-pic").attr("src", "img/one.png");
      var playerOneTurn = false;
      if (!playerOneTurn) {
         $("#player-two-buttons").show();
         $("#player-one-buttons").hide();
      } else {
        $("#player-one-buttons").show();
        $("#player-two-buttons").hide();
      }
    } else if (sixSidedDiceRoll === 2) {
      $("#dice-pic").attr("src", "img/two.png");
    } else if (sixSidedDiceRoll === 3) {
      $("#dice-pic").attr("src", "img/three.png");
    } else if (sixSidedDiceRoll === 4) {
      $("#dice-pic").attr("src", "img/four.png");
    } else if (sixSidedDiceRoll === 5) {
      $("#dice-pic").attr("src", "img/five.png");
    } else if (sixSidedDiceRoll === 6) {
      $("#dice-pic").attr("src", "img/six.png");
    }
  });
$("#player-one-stay").click(function(event) {
  event.preventDefault();

  playerOne.stayTurn();
  $("#player-one-running").html("<h1 class='running-total'>" + playerOne.turnRunningScore + "</h1>");
  $("#player-one-score").html("<h1 class='total-score'>" + playerOne.totalBankedScore + "</h1>");

  if (playerOne.totalBankedScore >= 100) {
    $("#winner").show();
    $("#winner").html("<h1 class='total-score'>" + "You are the winner..!!!" + "</h1>");
  } else {
    $("#winner").text("");
  }

  var playerOneTurn = false;
    if (!playerOneTurn) {
       $("#player-two-buttons").show();
       $("#player-one-buttons").hide();
    } else {

      $("#player-two-buttons").hide();
      $("#player-one-buttons").show();
    }
  })
  $("#player-two-roll").click(function(event) {
    event.preventDefault();
    var sixSidedDiceRoll = sixSidedDice.roll();
    playerTwo.setLastRoll(sixSidedDiceRoll);
    playerTwo.resetRunningTotalOnOne(sixSidedDiceRoll);
    playerTwo.addRollToArray(sixSidedDiceRoll);
    playerTwo.sumOfRolls();

    $("#player-two-running").html("<h1 class='running-total'>" + playerTwo.turnRunningScore + "</h1>");

    if (sixSidedDiceRoll === 1) {
      $("#dice-pic").attr("src", "img/one.png");
      var playerOneTurn = true;
      if (playerOneTurn) {
         $("#player-one-buttons").show();
         $("#player-two-buttons").hide();
      } else {
        $("#player-two-buttons").show();
        $("#player-one-buttons").hide();
      }
    } else if (sixSidedDiceRoll === 2) {
      $("#dice-pic").attr("src", "img/two.png");
    } else if (sixSidedDiceRoll === 3) {
      $("#dice-pic").attr("src", "img/three.png");
    } else if (sixSidedDiceRoll === 4) {
      $("#dice-pic").attr("src", "img/four.png");
    } else if (sixSidedDiceRoll === 5) {
      $("#dice-pic").attr("src", "img/five.png");
    } else if (sixSidedDiceRoll === 6) {
      $("#dice-pic").attr("src", "img/six.png");
    }
  });
$("#player-two-roll").on("click", function() {
  var animationName = 'animated tada';
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $("#dice-pic").addClass(animationName).one(animationEnd, function() {
    $(this).removeClass(animationName);
  });
});
$("#player-two-stay").click(function(event) {
  event.preventDefault();

  playerTwo.stayTurn();
  $("#player-two-running").html("<h1 class='running-total'>" + playerTwo.turnRunningScore + "</h1>");
  $("#player-two-score").html("<h1 class='total-score'>" + playerTwo.totalBankedScore + "</h1>");

  if (playerTwo.totalBankedScore >= 100) {
    $("#winner").show();
    $("#winner").html("<h1 class='total-score'>" + "You are the winner..!!!" + "</h1>");
  } else {
    $("#winner").text("");
  }

  var playerOneTurn = true;

    if (playerOneTurn) {
       $("#player-one-buttons").show();
       $("#player-two-buttons").hide();
    } else {
      $("#player-two-buttons").show();
      $("#player-one-buttons").hide();
    }
  });
function Player(name) {
  this.name = name;
  this.turnRunningScore = 0;
  this.totalBankedScore = 0;
  this.lastRoll = 0;
  this.currentTurnArray = [];
}
var playerOne = new Player("Player One");
var playerTwo = new Player("Player Two");
function Dice(sides) {
  this.sides = sides || 6;
}
Dice.prototype.roll = function() {
  var roll = Math.floor((Math.random() * this.sides ) + 1);
  if (roll === 1) {
    alert("Stop, you've thrown 1. Your turn is over.");
  }
  return roll;
}
Player.prototype.addRollToArray = function (x) {
  this.currentTurnArray.push(x)
}
Player.prototype.sumOfRolls = function() {
  for (var i = 0; i < this.currentTurnArray.length; i++) {
    if (this.currentTurnArray[i = this.currentTurnArray.length - 1] === 1) {
      this.turnRunningScore = this.turnRunningScore;
    } else {
      this.turnRunningScore += this.currentTurnArray[i = this.currentTurnArray.length - 1];
    }
  }
}
Player.prototype.bankPoints = function() {
  this.totalBankedScore += this.turnRunningScore;
}
Player.prototype.stayTurn = function () {
  this.bankPoints();
  this.turnRunningScore = 0;
}
var sixSidedDice = new Dice();
Player.prototype.setLastRoll = function(x) {
  this.lastRoll = x;
}
Player.prototype.resetRunningTotalOnOne = function() {
  if (this.lastRoll === 1) {
    this.turnRunningScore = 0;
  }
}
});