//import TitleScene from "./TitleScene.js";
//import GameOver from "./GameOver.js";

//let title = new TitleScene(this);
//let gameOver = new GameOver();

var DEBUG = false;

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
//game.scene.add("TitleScene", title);
//game.scene.add("GameOver", gameOver);
//game.scene.start("TitleScene");

function preload() {
    this.load.image('background', '../images/swing/forest.png');
    this.load.image('ground', '../images/swing/platform.png');
    this.load.image('banana', '../images/swing/banana.png');
    this.load.image('bomb', '../images/swing/bomb.png');
    this.load.image('monkey','../images/swing/monkey.png');
}

var gameStarted = false;
var target = new Phaser.Math.Vector2();
var platforms;
var bombs;
var score = 0;
var scoreText;
var text1;
var player = null;
var bananas
var titleText;
var messageText;

function create() {
    this.add.image(600, 400, 'background');

    scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.input.keyboard.addKeyCapture([Phaser.Input.Keyboard.KeyCodes.SPACE]);

    text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
    titleText = this.add.text(400, 200, 'Monkey Swing', { fontSize: "64px", fill: '#ffff00' });
    messageText = this.add.text(400, 600, 'Press [Space] to Start', { fontSize: "32px", fill: '#ffff00' });

    scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });  

    platforms = this.physics.add.staticGroup();

    player = this.physics.add.sprite(100, 450, 'monkey').setScale(0.15).refreshBody();
    player.disableBody(true, true);

    bananas = this.physics.add.group({
        key: 'banana',
        repeat: 16,
        setXY: { x: 12, y: 0, stepX: 70 },
        setScale: { x: 0.125, y: 0.125 }
    });

    bananas.children.iterate(function (child) {
        child.disableBody(true, true);
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bananas, platforms);
    this.physics.add.overlap(player, bananas, collectBananas, null, this);
    /*platforms.create(600, 700, 'ground').setScale(3).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    };*/



    this.input.mouse.disableContextMenu();

    this.input.on('pointerdown', function (pointer) {

        target.x = pointer.x;
        target.y = pointer.y;

        // Move at 400 px/s:
        this.physics.moveToObject(player, target, 400);

    }, this);
}

function update() {
    var pointer = this.input.activePointer;

    if (this.spaceKey.isDown && !gameStarted) {
        gameStarted = true;

        Init();
    }

    if (pointer.isDown) {
        this.physics.moveToObject(player, target, 400);
    } 

    if (DEBUG == true) {
        text1.setText([
            'x: ' + pointer.worldX,
            'y: ' + pointer.worldY,
            'isDown: ' + pointer.isDown
        ]);
    }

    if (player != null) {
        var distance = Phaser.Math.Distance.Between(player.x, player.y, target.x, target.y);

        if (player.body.speed < 0) {
            //  4 is our distance tolerance. The faster it moves, the more tolerance is required.
            if (distance < 4) {
                player.body.reset(target.x, target.y);
                player.anims.stop();
            }
        }
    }
}

function collectBananas(player, banana) {
    banana.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (bananas.countActive(true) === 0) {
        bananas.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function Init() {
    platforms.create(600, 700, 'ground').setScale(3).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player.enableBody(true, true);
    titleText.destroy();
    messageText.destroy();

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.enableBody(true, player.x, 100, true, true);

    bananas.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    });
}