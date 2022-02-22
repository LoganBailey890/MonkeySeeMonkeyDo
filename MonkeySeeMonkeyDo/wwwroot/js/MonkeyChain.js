
/*
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40; const keyPressed = event.keyCode;
*/

var gameCanvas = document.getElementById("gameCanvas");

var game = gameCanvas.getContext("2d");

game.fillStyle = 'black';

game.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight);

var monkeyImg = new Image();
monkeyImg.src = "/images/Chain/Chain_Monkey.png";

var bananaImg = new Image();
bananaImg.onload = imgLoaded;
bananaImg.src = "/images/Chain/Chain_Banana.png";

let dx = 0;

let dy = -20;

let changingDirection = false;



let chain =
    [
        { x: 400, y: 300 },
        { x: 400, y: 320 },
        { x: 400, y: 340 },
        { x: 400, y: 360 }
    ]

function imgLoaded() {

    console.log("| ALL IMAGES LOADED |")

    main();

    document.addEventListener("keydown", changeDirection);  

    createFood();
  
}

function main() {
    

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        advanceChain();
        drawFood();
        drawChain(); main();
    }, 100)
}



function advanceChain() {
    const head = { x: chain[0].x + dx, y: chain[0].y + dy };

  

    chain.unshift(head); 

    const didEatFood = chain[0].x === foodX && chain[0].y === foodY;
    if (didEatFood) {
        // Generate new food location
        createFood();
    } else {
        // Remove the last part of snake body
        chain.pop();
    }
}

function drawChain() {
    chain.forEach(drawChainPart)
}

function drawChainPart(chainPart) {
    console.log("Chain: " + chainPart.x + " | " + chainPart.y);
    game.drawImage(monkeyImg, chainPart.x, chainPart.y);
}

function createFood() {
    foodX = randomTwenty(0, gameCanvas.width - 20);
    foodY = randomTwenty(0, gameCanvas.height - 20);

    console.log("Food: " + foodX + " | " + foodY);
}

function drawFood() {
    game.drawImage(bananaImg, foodX, foodY);
}

function clearCanvas() {
    //  Select the colour to fill the drawing
    game.fillStyle = 'black';
    //  Select the colour for the border of the canvas
  

    // Draw a "filled" rectangle to cover the entire canvas
    game.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    game.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function changeDirection(event) {

    // Setting up keycode consts and keycode presses
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;

    // Setting up direction consts
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (changingDirection) return;
    changingDirection = true;

    // Setting up the keypress responses
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    } if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    } if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    } if (keyPressed === DOWN_KEY && !goingDown) {
        dx = 0;
        dy = 20;
    }
}

function randomTwenty(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

