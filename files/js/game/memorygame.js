'use strict';
/* App Controllers */


var memoryGameApp = angular.module('memoryGameApp', []);

/*
memoryGameApp.factory('game', function() {
  var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

  return new Game(tileNames);
});
*/

memoryGameApp.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:8080');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});




memoryGameApp.controller('GameCtrl', function GameCtrl($scope, $timeout, socket) {
var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

  $scope.game = new Game(tileNames);
  //chat socket
  var name = prompt("Please tell us your name");
  if (name === "") name = "Guest";
  socket.emit('join', name);
  $scope.game.chatHistory.push("Welcome, " + name);

  $('#message_form').submit(function(e) {
    //var message = $('#message_input').val();
    //$('#message_input').val('');
    socket.emit('message', $scope.game.sendMessage);
    $scope.game.sendMessage = "";

  });

  socket.on('message', function(data) {
    $scope.game.chatHistory.push(data);
  });

  socket.on('names', function(names) {
    //for (var i=0;i<names;i++) {}
    $scope.game.names = names;
      //updateName(names);
      //console.log(names);
  });


//memory game
  function Tile(title) {
    this.title = title;
    this.flipped = false;
  }

  Tile.prototype.flip = function() {
    this.flipped = !this.flipped;
  }


  function Game(tileNames) {
    var tileDeck = makeDeck(tileNames);

    this.sendMessage = "";
    this.names = [];
    this.chatHistory = [];
    this.grid = makeGrid(tileDeck);
    this.message = Game.MESSAGE_CLICK;
    this.unmatchedPairs = tileNames.length;
    this.fliping = false;
    this.flipTile = function(tile) {
      if (tile.flipped || this.fliping) {
        return;
      }
      this.fliping = true;
      tile.flip();
      if (!this.firstPick || this.secondPick) {

        if (this.secondPick) {
          console.log("too fast");
          //this.firstPick.flip();
          //this.secondPick.flip();
          //this.firstPick = this.secondPick = undefined;
        }

        this.firstPick = tile;
        this.message = Game.MESSAGE_ONE_MORE;
        this.fliping = false;

      } else {

        if (this.firstPick.title === tile.title) {
          this.unmatchedPairs--;
          this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.MESSAGE_WON;
          this.firstPick = this.secondPick = undefined;
          this.fliping = false;
        } else {
          this.secondPick = tile;
          this.message = Game.MESSAGE_MISS;
          
          $timeout(function() {$scope.game.flipMissedTile();}, 2000);
          //this.flipMissedTile();
          //$timeout(this.flipMissedTile, 2000);

        }
      }
    }, 
    this.flipMissedTile = function() {
      this.firstPick.flip();
      this.secondPick.flip();
      this.firstPick = this.secondPick = undefined;
      this.fliping = false;
    }
  }

  Game.MESSAGE_CLICK = 'Click on a tile.';
  Game.MESSAGE_ONE_MORE = 'Pick one more card.'
  Game.MESSAGE_MISS = 'Try again.';
  Game.MESSAGE_MATCH = 'Good job! Keep going.';
  Game.MESSAGE_WON = 'You win!';



  /* Create an array with two of each tileName in it */
  function makeDeck(tileNames) {
    var tileDeck = [];
    tileNames.forEach(function(name) {
      tileDeck.push(new Tile(name));
      tileDeck.push(new Tile(name));
    });

    return tileDeck;
  }


  function makeGrid(tileDeck) {
    var gridDimension = Math.sqrt(tileDeck.length),
        grid = [];

    for (var row = 0; row < gridDimension; row++) {
      grid[row] = [];
      for (var col = 0; col < gridDimension; col++) {
          grid[row][col] = removeRandomTile(tileDeck);
      }
    }

    return grid;
  }


  function removeRandomTile(tileDeck) {
    var i = Math.floor(Math.random()*tileDeck.length);
    return tileDeck.splice(i, 1)[0];
  }

});


//usages:
//- in the repeater as: <mg-card tile="tile"></mg-card>
//- card currently being matched as: <mg-card tile="game.firstPick"></mg-card>
/*
memoryGameApp.directive('mgCard', function() {
  return {
    restrict: 'E',
    // instead of inlining the template string here, one could use templateUrl: 'mg-card.html'
    // and then either create a mg-card.html file with the content or add
    // <script type="text/ng-template" id="mg-card.html">.. template here.. </script> element to
    // index.html
    template: '<div class="container">' +
                '<div class="card" ng-class="{flipped: tile.flipped}">' +
                  '<img class="front" ng-src="files/img/games/memory/back.png">' +
                  '<img class="back" ng-src="files/img/games/memory/{{tile.title}}.png">' +
                '</div>' +
              '</div>',
    scope: {
      tile: '='
    }
  }
});
*/



/* Memory Game Models and Business Logic */




