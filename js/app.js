var jumbledGame = angular.module('jumbledGame', []);

jumbledGame.controller('gameCtrl', function() {
  game = this;

  game.init = function() {
    game.words = ["CHOICE", "MOTHER", "FATHER", "SISTER"];
    game.nextWord();
    game.guessRowClass = "row";
  }
  
  game.nextWord = function() {
    game.word = game.words[Math.floor((4*Math.random()))]; 
    console.log(game.word);
    game.chars = game.word.split("").shuffle();
    game.guess = [];
    game.chosenIndices = [];
  }

  game.checkAnswer = function() {
    var correct = true;
    for(var i = 0; i<game.chars.length; i++) {
      correct = correct && (game.word[i] == game.guess[i]);
    }

    if (correct) {
      game.guessRowClass += " correct";
    } else {
      game.guessRowClass += " wrong";
    }
  }

  game.choose = function(ind) {
    if (game.chosenIndices.indexOf(ind) != -1) {
      return;
    }

    var chr = game.chars[ind];
    game.chars[ind] = null;
    game.guess.push(chr);
    game.chosenIndices.push(ind);

    if(game.guess.length == game.chars.length) {
      game.checkAnswer();
    }
  };

  game.charClass = function(ind) {
    var className = "col-xs-4 char"
    if (game.chars[ind] == null) {
      className += " chosen";
    }

    return className;
  }

  game.init();
});