
/*
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40; const keyPressed = event.keyCode;
*/


// CREATE CANVAS

var gameCanvas = document.getElementById("gameCanvas");

var game = gameCanvas.getContext("2d");

game.fillStyle = 'black';

game.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight);


// LOAD IMAGES


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



var monkeyElbowDL = new Image();
monkeyElbowDL.src = "/images/Chain/Chain_Monkey_Elbow_DL.png";

var monkeyElbowDR = new Image();
monkeyElbowDR.src = "/images/Chain/Chain_Monkey_Elbow_DR.png";

var monkeyElbowLD = new Image();
monkeyElbowLD.src = "/images/Chain/Chain_Monkey_Elbow_LD.png";

var monkeyElbowRD = new Image();
monkeyElbowRD.src = "/images/Chain/Chain_Monkey_Elbow_RD.png";

var monkeyElbowUL = new Image();
monkeyElbowUL.src = "/images/Chain/Chain_Monkey_Elbow_UL.png";

var monkeyElbowUR = new Image();
monkeyElbowUR.src = "/images/Chain/Chain_Monkey_Elbow_UR.png";

var monkeyElbowLU = new Image();
monkeyElbowLU.src = "/images/Chain/Chain_Monkey_Elbow_LU.png";

var monkeyElbowRU = new Image();
monkeyElbowRU.src = "/images/Chain/Chain_Monkey_Elbow_RU.png";



var startButton = new Image();
startButton.src = "/images/Chain/StartButton.png";

var restartButton = new Image();
restartButton.src = "/images/Chain/RestartButton.png";

var submitButton = new Image();
submitButton.src = "/images/Chain/SubmitButton.png";

var bananaImg = new Image();
bananaImg.onload = imgLoaded;
bananaImg.src = "/images/Chain/Chain_Banana.png";



// SET GLOBAL VARIABLES

let score = 0;

let dx = 0;

let dy = -20;

let changingDirection = false;

let direction = 1;

let wasTurnedLast = false;

// d -:
// 1 = UP | 2 = RIGHT | 3 = DOWN | 4 = LEFT


let bodyPart = 1;

// bodyPart -:
// 1 = HEAD | 2 = BODY | 3 = END  >>>>  4-11 = ELBOWS |

// STARTING SNAKE

let chain =
    [
        { x: 400, y: 300, d: 1, b: 1},
        { x: 400, y: 320, d: 1, b: 2},
        { x: 400, y: 340, d: 1, b: 2},
        { x: 400, y: 360, d: 1, b: 3}
    ]


// ON IMAGE LOAD START

function imgLoaded() {

    console.log("| ALL IMAGES LOADED |")

    waitStart();

    document.addEventListener("keydown", changeDirection);  

    createFood();

  
}



function waitStart() {


    game.drawImage(startButton, 370, 300);

    game.font = "25px Courier New";

    game.fillStyle = "white";

    game.fillText("MONKEY CHAIN :)", 300, 250);

    game.fillStyle = "black";

    //Binding the click event on the canvas
    gameCanvas.addEventListener('click', onClickStart, false);

}

function onClickRestart(evt) {
    var rect = {
        x: 370,
        y: 300,
        width: 60,
        height: 30
    };

    var mousePos = getMousePos(gameCanvas, evt);

    if (isInside(mousePos, rect)) {
        restartGame();
        gameCanvas.removeEventListener('click', onClickRestart, false);
    }
}

function onClickStart(evt) {
    var rect = {
        x: 370,
        y: 300,
        width: 60,
        height: 30
    };

    var mousePos = getMousePos(gameCanvas, evt);

    if (isInside(mousePos, rect)) {
        main();
        gameCanvas.removeEventListener('click', onClickStart, false);
    }
}

function waitRestart() {

    game.drawImage(restartButton, 370, 300);

    game.font = "25px Courier New";

    game.fillStyle = "white";

    game.fillText("GAME OVER :(", 300, 250);

    game.font = "15px Courier New";

    game.fillText("Score | " + score, 355, 280);

    game.fillStyle = "black";

    gameCanvas.addEventListener('click', onClickRestart, false);

    $.post({ url: 'Submit', scoreIn: score });

        $.ajax({
        url: 'Submit',
        type: 'POST',
        data: { scoreIn: score },
        success: function (result) {
            console.log("score submitted");
        }
          });
/*
    var url = '@Url.Action("Submit")' + '?a=' + score;
    console.log(url);
    document.location = url;*/

}

// MAIN FUNC GAME RUN

function main() {


     

    // RESET

    if (didGameEnd()) {
        
       
        waitRestart();
        // SUBMIT SCORE HERE

        /*
        var restartBtn = document.createElement("BUTTON");
        var restartTxt = document.createTextNode("RESTART");
        restartBtn.appendChild(restartTxt);
        document.body.appendChild(restartBtn);
        restartBtn.tra
        */
        return;
    }


    // MAIN LOOP
    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        advanceChain();
        drawFood();
        drawChain(); main();
        drawScore();
        drawCredit();
    }, 100)
}

// GAME RESET GLOBAL VALUES

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


// MOVING 
function advanceChain() {

    // CREATE NEW HEAD
    const head = { x: chain[0].x + dx, y: chain[0].y + dy, d: 1 , b: 1};


    // FIND DIRECTION

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

    
    // PUT HEAD ON TOP OF ARRAY
    chain.unshift(head); 

    
    // IF FOOD KEEP LAST ON ARRAY | IF NOT POP LAST OFF ARRAY TO KEEP LENGTH

    const didEatFood = chain[0].x === foodX && chain[0].y === foodY;
    if (didEatFood) {

        score += 25;
        // Generate new food location
        createFood();
    } else {
        // Remove the last part of snake body
        chain.pop();
    }


    // HEAD BODYPART ALWAYS = 1
    chain[0].b = 1;


    //  LOGIC FOR END OF TAIL DIRECTION ON TURNING

    if (chain[chain.length - 2].d != chain[chain.length - 1].d) {

        switch (chain[chain.length - 1].d) {
            case 1:
                chain[chain.length - 1].d = chain[chain.length - 2].d;

                break;

            case 2:
                chain[chain.length - 1].d = chain[chain.length - 2].d;

                break;

            case 3:
                chain[chain.length - 1].d = chain[chain.length - 2].d;

                break;

            case 4:
                chain[chain.length - 1].d = chain[chain.length - 2].d;

                break;
            
        }

    }

    // SETTING END OF CHAIN TO TAIL BODYPART
     chain[chain.length - 1].b = 3

    


    // FUNKY BUSINESS TIME

    // FOR : BODY PARTS // CHECK IF ROTATED AND USE ELBOW FOR RESPECTIVE TURN ANGLE

    for (i = 1; i < (chain.length - 2); i++)
    {
            if (chain[i - 1].d != chain[i].d) {

                if (chain[i - 1].d == 1 && chain[i + 1].d == 2) {
                    chain[i].b = 11;
                }

                else if (chain[i - 1].d == 2 && chain[i + 1].d == 3) {
                    chain[i].b = 10;
                }

                else if (chain[i - 1].d == 3 && chain[i + 1].d == 4) {
                    chain[i].b = 9;
                }

                else if (chain[i - 1].d == 4 && chain[i + 1].d == 1) {
                    chain[i].b = 8;
                }

                else if (chain[i - 1].d == 1 && chain[i + 1].d == 4) {
                    chain[i].b = 7;
                }

                else if (chain[i - 1].d == 4 && chain[i + 1].d == 3) {
                    chain[i].b = 6;
                }

                else if (chain[i - 1].d == 3 && chain[i + 1].d == 2) {
                    chain[i].b = 5;
                }

                else if (chain[i - 1].d == 2 && chain[i + 1].d == 1) {
                    chain[i].b = 4;
                }


            // REPEATED TURNS

                else if (chain[i - 1].d == 1 && chain[i + 1].d == 1) {
                    switch (chain[i].d) {
                        case 2:
                            chain[i].b = 11;
                            break;
                        case 4:
                            chain[i].b = 7;
                            break;
                    }
                }

                else if (chain[i - 1].d == 2 && chain[i + 1].d == 2) {
                    switch (chain[i].d) {
                        case 1:
                            chain[i].b = 4;
                            break;
                        case 3:
                            chain[i].b = 10;
                            break;
                    }
                }

                else if (chain[i - 1].d == 3 && chain[i + 1].d == 3) {
                    switch (chain[i].d) {
                        case 2:
                            chain[i].b = 5;
                            break;
                        case 4:
                            chain[i].b = 9;
                            break;
                    }
                }

                else if (chain[i - 1].d == 4  && chain[i + 1].d == 4) {
                    switch (chain[i].d) {
                        case 1:
                            chain[i].b = 8;
                            break;
                        case 3:
                            chain[i].b = 6  ;
                            break;
                    }
                }

                // THIS IS GONNA SUCK, THIS LOGIC SUCKS, I SUCK, SUCK, D:
                    

                // TEST 2

                else if (chain[i - 1].d == 2 && chain[i + 1].d == 4) {
                    switch (chain[i].d) {
                        case 1:
                            chain[i].b = 4;
                            break;
                        case 3:
                            chain[i].b = 10;
                            break;
                    }
                }
                else if (chain[i - 1].d == 4 && chain[i + 1].d == 2) {
                    switch (chain[i].d) {
                        case 1:
                            chain[i].b = 8;
                            break;
                        case 3:
                            chain[i].b = 6;
                            break;
                    }
                }
                else if (chain[i - 1].d == 1 && chain[i + 1].d == 3) {
                    switch (chain[i].d) {
                        case 2:
                            chain[i].b = 11;
                            break;
                        case 4:
                            chain[i].b = 7;
                            break;
                    }
                }
                else if (chain[i - 1].d == 3 && chain[i + 1].d == 1) {
                    switch (chain[i].d) {
                        case 2:
                            chain[i].b = 5;
                            break;
                        case 4:
                            chain[i].b = 9;
                            break;
                    }
                }

                
                
                // ELSE JUST MAKE IT LONG BOI (REGULAR BODY PART)
                else chain[i].b = 2;


               // drawDebug(chain, i);

        }

        // SAFEGUARD REGULAR BODY PART 
        else chain[i].b = 2;

       // drawDebug(chain, i);
  
    }
}

// DRAW CHAIN

function drawChain() {
    // JUST DRAW EACH PART LOL 
    chain.forEach(drawChainPart)
}


// DRAWING EACH PART

function drawChainPart(chainPart) {
    //console.log("Chain: " + chainPart.x + " | " + chainPart.y + " | D: " + chainPart.d + " | B: " + chainPart.b);
    //console.log(" D: " + chainPart.d + " | B: " + chainPart.b);


    // FINDING WHICH IMAGE TO DRAW, JUST INPUT VALUE LOGIC
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

            game.drawImage(monkeyElbowUR, chainPart.x, chainPart.y);

            break;

        case 5:

            game.drawImage(monkeyElbowRD, chainPart.x, chainPart.y);

            break;

        case 6:

            game.drawImage(monkeyElbowDL, chainPart.x, chainPart.y);

            break;

        case 7:

            game.drawImage(monkeyElbowLU, chainPart.x, chainPart.y);

            break;

        case 8:

            game.drawImage(monkeyElbowUL, chainPart.x, chainPart.y);

            break;

        case 9:

            game.drawImage(monkeyElbowLD, chainPart.x, chainPart.y);

            break;

        case 10:

            game.drawImage(monkeyElbowDR, chainPart.x, chainPart.y);

            break;

        case 11:

            game.drawImage(monkeyElbowRU, chainPart.x, chainPart.y);

            break;


    }
}

// CREATE FOOD RANDOMLY POSITIONED ON GRID

function createFood() {
    foodX = randomTwenty(0, gameCanvas.width - 20);
    foodY = randomTwenty(0, gameCanvas.height - 20);

    // console.log("Food: " + foodX + " | " + foodY);

    chain.forEach(function isChain(part) {
        const isBanana= part.x == foodX && part.y == foodY;
        if (isBanana) createFood();
    });

}

// JUST DRAW THE IMAGE LOL

function drawFood() {
    game.drawImage(bananaImg, foodX, foodY);
}


// FRAME RESET FOR EACH TICK | FOR CANVAS REDRAW EACH FRAME

function clearCanvas() {
    //  Select the colour to fill the drawing
    game.fillStyle = 'black';
    //  Select the colour for the border of the canvas
  

    // Draw a "filled" rectangle to cover the entire canvas
    game.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    game.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// KEY RECOGNITION AND DIRECTION CHANGE

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

    // DID YOU DIE | CHECKS FOR WALL HITS | SELF HITS

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

// random min max 20 clamp
function randomTwenty(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}


// DRAW THE SCORE ON SCREEN
function drawScore() {
    game.font = "25px Courier New";

    game.fillStyle = "white";

    game.fillText(score, 10, 35);

    game.fillStyle = "black";
}

function drawCredit() {
    game.font = "10px Courier New";

    game.fillStyle = "white";

    game.fillText("KONA ?", 755, 595);

    game.fillStyle = "black";
}

// COOL DEBUG :) ME LIKE ME MAKE ME COOL
function drawDebug(chain, count) {
    game.font = "25px Courier New";

    game.fillStyle = "white";

    game.fillText((" PREV: " + chain[count - 1].d  + " | CURR: " + chain[count].d + " | AHEAD: " + chain[count + 1].d), 10, 560);
    game.fillText(("BODY: " + chain[count].b), 10, 530);

    game.fillStyle = "black";
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

