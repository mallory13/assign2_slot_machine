﻿/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var canvas;
var stage;
var betText;
var creditText;
var winningsText;
var spin;
var reset;
var quit;
var bg;
var reel1;
var reel2;
var reel3;


/*set up canvas and stage*/
function init(){
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage (canvas);
	stage.enableMouseOver(20);
	createjs.Ticker.addEventListener("tick", gameLoop);
	createjs.Ticker.setFPS(60);
	setBG();
	drawSlot();
	
	
	
}

function gameLoop (){
	
	stage.update();
}

function drawSlot(){
	
	
/*Set the background*/
bg = new createjs.Bitmap();
bg.src="images/slot_bgd.png";
bg.onload = setBG;


	
/*Accept input for player bet*/



/*Set coordinates for bet text output*/
	betText = new createJS.Text(playerBet);
	betText.x = 357;
	betText.y = 459;


/*Set coordinates for credit text output*/
	creditText = new createJS.Text(playerMoney);
	creditText.x = 179;
	creditText.y = 459;


/*Set coordinates for winnings text output*/
	winningsText = new createJS.Text(winnings);
	winningsText.x = 494;
	winningsText.y = 459;


/*Set reels*/




/*set image variables*/
grapes = new createJS.Bitmap("images/grapes.png");


bananas = new createjs.Bitmap("images/bananas.png");


oranges = new createjs.Bitmap("images/oranges.png");


cherries = new createjs.Bitmap("images/cherries.png");


bars = new createjs.Bitmap("images/bars.png");


bells = new createjs.Bitmap("images/bells.png");


sevens = new createjs.Bitmap("images/sevens.png");


blanks = new createjs.Bitmap("images/blanks.png");






/*set reset button*/
reset = new createjs.Bitmap("images/reset.png");
reset.x = 52;
reset.y = 22;
stage.addChild(reset)
resetAll();

/*set spin button*/
spin = new createjs.Bitmap("images/spin.png");
spin.x = 637;
spin.y = 462;
stage.addChild(spin)
startGame();


/*set exit button*/
quit = new createjs.Bitmap("images/quit.png");
quit.x = 662;
quit.y = 22;
stage.addChild(quit)
quit.click(function(){
	this.exit;
});

function swapImage() {
            var bmp = new createjs.Bitmap(imagesPaths[index]);
            bmp.image.onload = function () {
                imageContainer.removeAllChildren();
                imageContainer.addChild(bmp);
            }
}

}


/*function to set the background*/
function setBG(event){
	var bgrnd = new createjs.Bitmap(bg);
	stage.addChild(bgrnd);
	stage.update();	
	
}


/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
$("#resetButton").click(function 
 resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
})


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function startGame() {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
    
});
