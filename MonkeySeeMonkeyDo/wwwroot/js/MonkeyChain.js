
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



var monkeyHeadU = new Image();
monkeyHeadU.src = "/images/Chain/Chain_Monkey_Head_U.png";

var monkeyHeadD= new Image();
monkeyHeadD.src = "/images/Chain/Chain_Monkey_Head_D.png";

var monkeyHeadL = new Image();
monkeyHeadL.src = "/images/Chain/Chain_Monkey_Head_L.png";

var monkeyHeadR= new Image();
monkeyHeadR.src = "/images/Chain/Chain_Monkey_Head_R.png";



var monkeyBodyU = new Image();
monkeyBodyU.src = "/images/Chain/Chain_Monkey_Body_U.png";

var monkeyBodyD = new Image();
monkeyBodyD.src = "/images/Chain/Chain_Monkey_Body_D.png";

var monkeyBodyL = new Image();
monkeyBodyL.src = "/images/Chain/Chain_Monkey_Body_L.png";

var monkeyBodyR = new Image();
monkeyBodyR.src = "/images/Chain/Chain_Monkey_Body_R.png";




var monkeyEndU = new Image();
monkeyEndU.src = "/images/Chain/Chain_Monkey_End_U.png";

var monkeyEndD = new Image();
monkeyEndD.src = "/images/Chain/Chain_Monkey_End_D.png";

var monkeyEndL = new Image();
monkeyEndL.src = "/images/Chain/Chain_Monkey_End_L.png";

var monkeyEndR = new Image();
monkeyEndR.src = "/images/Chain/Chain_Monkey_End_R.png";



var monkeyElbow1 = new Image();
monkeyElbow1.src = "/images/Chain/Elbow_1.png";

var monkeyElbow2 = new Image();
monkeyElbow1.src = "/images/Chain/Elbow_2.png";

var monkeyElbow3 = new Image();
monkeyElbow1.src = "/images/Chain/Elbow_3.png";

var monkeyElbow4 = new Image();
monkeyElbow1.src = "/images/Chain/Elbow_4.png";





var bananaImg = new Image();
bananaImg.onload = imgLoaded;
bananaImg.src = "/images/Chain/Chain_Banana.png";


let score = 0;

let dx = 0;

let dy = -20;

let changingDirection = false;

let direction = 1;

// d -:
// 1 = UP | 2 = RIGHT | 3 = DOWN | 4 = LEFT


let bodyPart = 1;

// bodyPart -:
// 1 = HEAD | 2 = BODY | 3 = END | 4 ELBOW |

let chain =
    [
        { x: 400, y: 300, d: 1, b: 1},
        { x: 400, y: 320, d: 1, b: 2},
        { x: 400, y: 340, d: 1, b: 2},
        { x: 400, y: 360, d: 1, b: 3}
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
        { x: 400, y: 300, d: 1, b: 1 },
        { x: 400, y: 320, d: 1, b: 2 },
        { x: 400, y: 340, d: 1, b: 2 }, 
        { x: 400, y: 360, d: 1, b: 3 }
        ]

    score = 0;

    dx = 0;

    dy = -20;

    direction = 1;

    changingDirection = false;

    main();

}

function advanceChain() {


    const head = { x: chain[0].x + dx, y: chain[0].y + dy, d: 1 , b: 1};

    switch (direction) {
        case 1:

            head.d = 1;

            break;

        case 2:

            head.d = 2;

            break;

        case 3:

            head.d = 3;

            break;

        case 4:

            head.d = 4;
           
            break;
    }

    

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

    chain[0].b = 1;
    chain[chain.length - 1].b = 3

    for (i = 1; i < (chain.length - 2); i++)
    {
       /* if (chain[i - 1].d != chain[i].d) {
            chain[i].b = 4;
        }
        else {*/
            chain[i].b = 2;
        /*}*/
    }
}


function drawChain() {
    chain.forEach(drawChainPart)
}

function drawChainPart(chainPart) {
    console.log("Chain: " + chainPart.x + " | " + chainPart.y + " | D: " + chainPart.d + " | B: " + chainPart.b);

    switch (chainPart.b) {
        case 1:

            switch (chainPart.d) {
                case 1:
                    game.drawImage(monkeyHeadU, chainPart.x, chainPart.y);
                    break
                case 2:
                    game.drawImage(monkeyHeadR, chainPart.x, chainPart.y);
                    break;
                case 3:
                    game.drawImage(monkeyHeadD, chainPart.x, chainPart.y);
                    break;
                case 4:
                    game.drawImage(monkeyHeadL, chainPart.x, chainPart.y);
                    break;
            }

            break;

        case 2:

            switch (chainPart.d) {
                case 1:
                    game.drawImage(monkeyBodyU, chainPart.x, chainPart.y);
                    break
                case 2:
                    game.drawImage(monkeyBodyR, chainPart.x, chainPart.y);
                    break;
                case 3:
                    game.drawImage(monkeyBodyD, chainPart.x, chainPart.y);
                    break;
                case 4:
                    game.drawImage(monkeyBodyL, chainPart.x, chainPart.y);
                    break;
            }

            break;

        case 3:

            switch (chainPart.d) {
                case 1:
                    game.drawImage(monkeyEndU, chainPart.x, chainPart.y);
                    break
                case 2:
                    game.drawImage(monkeyEndR, chainPart.x, chainPart.y);
                    break;
                case 3:
                    game.drawImage(monkeyEndD, chainPart.x, chainPart.y);
                    break;
                case 4:
                    game.drawImage(monkeyEndL, chainPart.x, chainPart.y);
                    break;
            }

            break;

        case 4:

            switch (chainPart.d) {
                case 1:
                    game.drawImage(monkeyElbow1, chainPart.x, chainPart.y);
                    break
                case 2:
                    game.drawImage(monkeyElbow2, chainPart.x, chainPart.y);
                    break;
                case 3:
                    game.drawImage(monkeyElbow3, chainPart.x, chainPart.y);
                    break;
                case 4:
                    game.drawImage(monkeyElbow4, chainPart.x, chainPart.y);
                    break;

            }
                    break;


    }
}

function createFood() {
    foodX = randomTwenty(0, gameCanvas.width - 20);
    foodY = randomTwenty(0, gameCanvas.height - 20);

    console.log("Food: " + foodX + " | " + foodY);

    chain.forEach(function isChain(part) {
        const isBanana= part.x == foodX && part.y == foodY;
        if (isBanana) createFood();
    });

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
        direction = 4;
        dx = -20;
        dy = 0;
    } if (keyPressed === UP_KEY && !goingDown) {
        direction = 1;
        dx = 0;
        dy = -20;
    } if (keyPressed === RIGHT_KEY && !goingLeft) {
        direction = 2;
        dx = 20;
        dy = 0;
    } if (keyPressed === DOWN_KEY && !goingUp) {
        direction = 3;  
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