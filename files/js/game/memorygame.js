'use strict';
/* App Controllers */


var memoryGameApp = angular.module('memoryGameApp', []);


memoryGameApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
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
//var tileNames = ['boat-china', 'castle', 'effiel-tower', 'golden-bridge', 'great-cayon', 'jiuzaigou',
//    'liberty-statue', 'metro-station'];
var tileNames = ['boat-china', 'castle', 'effiel-tower', 'golden-bridge', 'great-cayon', 'jiuzaigou',
    'liberty-statue', 'metro-station', 'puerto-rico', 'san-michelle', 'seaside', 'zhangjiajie'];

  $scope.game = new Game(tileNames);


  $scope.reset = function() {
    var name = $scope.game.name;
    var messages = $scope.game.chatHistory;
    var names = $scope.game.names;
    $scope.game = new Game(tileNames);
    getName(name);
    $scope.game.chatHistory = messages;
    $scope.game.names = names;
    
  };
  
  //chat socket
  var getName = function(name) {
    if (name === "") {
        name = prompt("Please tell us your name");
        if (typeof name == "undefined" || name === "") name = "Guest";
        socket.emit('join', name);
    }    
    $scope.game.chatHistory.push("Welcome, " + name);
    $scope.game.name = name;    
  };
$(document).ready(function() {
  getName('');  
});



//start multiplayer mode, lock and show hashcode
  $scope.multiplayer = function() {
    $scope.reset();
    $scope.game.hashcode = makeid();
    $scope.game.status = "Two Players";
    $scope.game.message = "Please send the hashcode to your friend who wants to join or watch";
    $scope.game.lock = true;
    $scope.game.firstStart = true;
  };

//join other people's game
  $scope.joinGame = function() {
    var hashcode = prompt("Please input your friend's invite code");
    if (hashcode === "") {alert("empty");return;}
    $scope.reset();
    $scope.game.hashcode = hashcode;
    $scope.game.lock = true;
    $scope.game.status = "Two Players";
    $scope.game.message = "Your friend's turn";
    socket.emit('pair', {hashcode: $scope.game.hashcode, name: $scope.game.name});
  };
  $scope.AIplay = function() {
    $scope.reset();
    $scope.game.AIplay();
  };

  $('#message_form').submit(function(e) {
    socket.emit('message', $scope.game.sendMessage);
    $scope.game.sendMessage = "";

  });

  socket.on('message', function(data) {
    $scope.game.chatHistory.push(data);
  });

  socket.on('names', function(names) {
    $scope.game.names = names;
  });

  //socket pair with the same hash code and record opponent name
  socket.on('pair', function(data) {
    //unrelative pairs
    if (data.hashcode !== $scope.game.hashcode) {console.log("unmatch hash");return;}
    //watcher come in
    if ($scope.game.opponent.name !== "") {
      //second player will ignore
      console.log("already paired");
      //first player will return grid
      if ($scope.game.firstStart) {
        var watchData = {
          hashcode: $scope.game.hashcode, 
          grid: $scope.game.grid, 
          watch: {
            firstPlayer: $scope.game.name, 
            firstScore: $scope.game.score, 
            secondPlayer: $scope.game.opponent.name, 
            secondScore: $scope.game.opponent.score
          }
        };
        socket.emit('watchgame', watchData);
      }
    }
    else {
      //set opponent 
      $scope.game.opponent.name = data.name;
      $scope.game.opponent.score = 0;
      $scope.game.playmode = 2; //mode 2 multiplayer
      
      if ($scope.game.firstStart) {
        $scope.game.lock = false;
        var gridPair = {hashcode: $scope.game.hashcode, 
          grid: $scope.game.grid, 
          checkname: $scope.game.opponent.name};
        socket.emit('pair', {hashcode: $scope.game.hashcode, name: $scope.game.name});
        socket.emit('grid', gridPair);
        $scope.game.message = "Your turn";
      }

    }

  });

  //socket set grid as second player
  socket.on('grid', function(data) {
    if (data.hashcode === $scope.game.hashcode && data.checkname === $scope.game.name)
      $scope.game.grid = data.grid;
  });
  //socket of receiving flip tile
  socket.on('flip', function(data) {
    if (data.hashcode !== $scope.game.hashcode) return;
    if ($scope.game.playmode === 2 && data.name === $scope.game.opponent.name) {
      $scope.game.opponent.score = data.score;
      $scope.game.opponentFlip(data.flipID);  
      if (data.lock) {
        $scope.game.lock = false;
        $scope.game.message = "Your Turn";
      }      
    } else if ($scope.game.playmode === 3) { //watching mode
      $scope.game.opponentFlip(data.flipID);
      if ($scope.game.watch.firstPlayer === data.name) $scope.game.watch.firstScore = data.score;
      else $scope.game.watch.secondScore = data.score;
      if ($scope.game.watch.secondScore + $scope.game.watch.firstScore >= $scope.game.unmatchedPairs) {
        $scope.game.message = ($scope.game.watch.firstScore>$scope.game.watch.secondScore)?$scope.game.watch.firstPlayer:$scope.game.watch.secondPlayer;
        $scope.game.message += " win!";
      }
    }

  });

  socket.on('watchgame', function(data) {
    //other group's pair:
    if (data.hashcode !== $scope.game.hashcode) return;
    //watch game
    if ($scope.game.opponent.name === "" && $scope.game.playmode !== 3) {
      $scope.game.playmode = 3; //watch mode
      $scope.game.grid = data.grid;
      $scope.game.watch = data.watch;
      $scope.game.status = "Watching Game";  
      $scope.game.message = "Please enjoy watching the game";    
    }

  });

//memory game
  function Tile(title) {
    this.title = title;
    this.flipped = false;
    this.tileID = 0;
    this.flip = function() {

    }
  }

  //Tile.prototype.flip = function() {
  //  this.flipped = !this.flipped;
  //}


  function Game(tileNames) {
    var tileDeck = makeDeck(tileNames);

    this.sendMessage = "";
    this.names = [];
    this.name = "";
    this.status = "Single Mode";
    this.score = 0;
    this.opponent = {name:"", score: ""};
    this.chatHistory = [];
    this.grid = makeGrid(tileDeck);
    this.message = "Game Start! Find cards with the same number";
    this.unmatchedPairs = tileNames.length;
    this.fliping = false;
    this.hashcode = "";
    this.lock = false;
    this.firstStart = false;
    this.AItarget = "";
    //mode 1: single paly, 2: multiplay, 3: watch, 4: play with AI
    this.playmode = 1;
    //for watch mode
    this.watch = {firstPlayer: "", firstScore: 0, secondPlayer: "", secondScore: 0};


    this.flipTile = function(tile) {
      if (tile.flipped || this.fliping || this.lock) {
        return;
      }
      this.fliping = true;
      tile.flipped = !tile.flipped;
      if (!this.firstPick || this.secondPick) {

        if (this.secondPick) {
          console.log("too fast");
          //this.firstPick.flip();
          //this.secondPick.flip();
          //this.firstPick = this.secondPick = undefined;
        }

        this.firstPick = tile;
        this.message = "Pick another one";
        if (this.playmode === 2)
          this.multiFlip(tile, false);
        this.fliping = false;

      } else {

        if (this.firstPick.title === tile.title) {
          this.firstPick = this.secondPick = undefined;
          this.fliping = false;
          this.score += 1;
          this.message = "Success, please continue";
          if (this.score + this.opponent.score === this.unmatchedPairs) {
            this.lock = true;
            if (this.score > this.opponent.score)
              this.message = "Congratulations, You win this Game!";
            else 
              this.message = "Sorry, you lose this game. Start a new one!";
          }
          if (this.playmode === 2)
            {this.multiFlip(tile, false);}
        } else {
          this.secondPick = tile;
          this.message = "Fail to pair, please try again";
          //flip the card in opponent's grid
          if (this.playmode === 2)
          this.multiFlip(tile, false);                              
          $timeout(function() {$scope.game.flipMissedTile();}, 2000);

        }
      }
    }, 
    this.flipMissedTile = function() {
      this.firstPick.flipped = false;
      this.secondPick.flipped = false;
      if (this.playmode == 2) {
        this.multiFlip(this.firstPick, false);
        //set lock flag
        this.multiFlip(this.secondPick, true);        
      }

      this.firstPick = this.secondPick = undefined;
      this.fliping = false;
      if (this.playmode === 4) {
        this.lock = true;
        this.message = "AI's turn";
        $timeout(function() {$scope.game.startAI();}, 2000);
      }
    },
//send flip tile to opponents and watchers, true/false: this turn is over or not
    this.multiFlip = function(tile, lock_flag) {
      if (lock_flag) {
        this.lock = true;
        this.message = "Your friend's turn";
      }
      var sendData = {
        hashcode: $scope.game.hashcode, 
        score: $scope.game.score, 
        flipID: tile.tileID, 
        name: $scope.game.name, 
        lock: lock_flag
      };
      socket.emit('flip', sendData);
      console.log(sendData);
    },
    this.opponentFlip = function(id) {
      for (var i=0;i<this.grid.length;i++) {
        for (var j=0;j<this.grid[i].length;j++) {
          if (this.grid[i][j].tileID === id) {
            this.grid[i][j].flipped = !this.grid[i][j].flipped;
            //console.log(this.grid);
          }
        }
      }
    }, 
    this.AIplay = function() {
      this.playmode = 4;
      this.opponent.name = "AI";
      this.opponent.score = 0;
      this.status = "AI Game";
      this.message = "Only who looks deep can win AI, please start first";

    }, 
    this.startAI = function() {
      for (var i=0;i<this.grid.length;i++) {
        for (var j=0;j<this.grid[i].length;j++) {
          if (!this.grid[i][j].flipped) {
            if (this.AItarget === "") {
              this.grid[i][j].flipped = true;
              this.AItarget = this.grid[i][j].title;
              $timeout(function() {$scope.game.startAI();}, 2000);
              return;
            } else {
              if (this.grid[i][j].title === this.AItarget ) {
                this.grid[i][j].flipped = true;
                this.AItarget = "";
                this.opponent.score ++;
                $timeout(function() {$scope.game.startAI();}, 2000);
                return;
              }
            }
          }
        }
      }
      if (this.score > this.opponent.score) this.message = "Congratulations, You Win!";
      else this.message = "Sorry, You Lose!";
    };

  };

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
    var gridROW = Math.floor(tileDeck.length/4),
        gridCOL = 4,
        grid = [];
    var count = 1;
    for (var row = 0; row < gridROW; row++) {
      grid[row] = [];
      for (var col = 0; col < gridCOL; col++) {
          grid[row][col] = removeRandomTile(tileDeck);
          grid[row][col].tileID = count++;
      }
    }

    return grid;
  }


  function removeRandomTile(tileDeck) {
    var i = Math.floor(Math.random()*tileDeck.length);
    return tileDeck.splice(i, 1)[0];
  }

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


});



