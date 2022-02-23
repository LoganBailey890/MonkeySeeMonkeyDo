
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

let score = 0;

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
    
    if (didGameEnd()) {
        
        game.font = "25px Courier New";

        game.fillStyle = "white";
 
        game.fillText("GAME OVER :(", 300, 300);

        game.fillStyle = "black";

        // SUBMIT SCORE HERE

        setTimeout(function onTick() {
            restartGame();
        }, 3000)

        /*
        var restartBtn = document.createElement("BUTTON");
        var restartTxt = document.createTextNode("RESTART");
        restartBtn.appendChild(restartTxt);
        document.body.appendChild(restartBtn);
        restartBtn.tra
        */
        return;
    }

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        advanceChain();
        drawFood();
        drawChain(); main();
        drawScore();
    }, 100)
}

function restartGame() {
    clearCanvas();
    chain =
        [
            { x: 400, y: 300 },
            { x: 400, y: 320 },
            { x: 400, y: 340 },
            { x: 400, y: 360 }
        ]

    score = 0;

    dx = 0;

    dy = -20;

    changingDirection = false;

    main();

}

function advanceChain() {
    const head = { x: chain[0].x + dx, y: chain[0].y + dy };

    chain.unshift(head); 

    const didEatFood = chain[0].x === foodX && chain[0].y === foodY;
    if (didEatFood) {

        score += 25;
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

    function didGameEnd() {
    for (let i = 4; i < chain.length; i++) {
        if (chain[i].x === chain[0].x && chain[i].y === chain[0].y) return true
    }

    const hitLeftWall = chain[0].x < 0;
    const hitRightWall = chain[0].x > gameCanvas.width - 20;
    const hitToptWall = chain[0].y < 0;
    const hitBottomWall = chain[0].y > gameCanvas.height - 20;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


function randomTwenty(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function drawScore() {
    game.font = "25px Courier New";

    game.fillStyle = "white";

    game.fillText(score, 10, 35);

    game.fillStyle = "black";
}