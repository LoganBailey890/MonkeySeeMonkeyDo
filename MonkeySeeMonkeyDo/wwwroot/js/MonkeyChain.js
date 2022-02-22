
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
monkeyImg.src = "/images/Chain/Chain_Banana.png";

let dx = 0;

let dy = 0;

let chain =
    [
        { x: 400, y: 580 }
    ]

createFood();

drawFood();

var stop = 0;

while (stop != 10) {
    setTimeout(function onTick() {
        drawFood()
        advanceChain();
        drawChain();
        main();
    }, 100)
    stop++;
}


/*main();

function main() {
    setTimeout(function onTick() {
        drawFood()
        advanceChain();
        drawChain();
        main();
    }, 100)
}*/


function advanceChain() {
    const head = { x: chain[0].x + dx, y: chain[0].y + dy };
    const didEatFood = chain[0].x === foodX && chain[0].y === foodY;
    if (didEatFood) {
        createFood();
    } else {
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

function changeDirection(event) {

    // Setting up keycode consts and keycode presses
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;

    // Setting up direction consts
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    // Setting up the keypress responses
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    } if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    } if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    } if (keyPressed === DOWN_KEY && !goingDown) {
        dx = 0;
        dy = 10;
    }
}

function randomTwenty(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
    foodX = randomTwenty(0, gameCanvas.width - 20);
    foodY = randomTwenty(0, gameCanvas.height - 20);

    console.log("Food: " + foodX + " | " + foodY);

    chain.forEach(function isFoodOnChain(part) {
        const foodIsOnChain = part.x == foodX && part.y == foodY
        if (foodIsOnChain)
            createFood();
    });
}

function drawFood() {
    game.drawImage(bananaImg, foodX, foodY);
}