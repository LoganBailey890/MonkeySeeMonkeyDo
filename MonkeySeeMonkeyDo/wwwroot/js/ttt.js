var game;

const NONE = 0;
const PLAYER_X = 1;
const PLAYER_O = 2;

window.onload = function() {
    var config = {
        type: Phaser.Auto,
        width: 620,
        height: 620,
        background: 0x000000,
        scene: [BootScene, PlayGameScene],
    };
    var game = new Phaser.Game(config);
}
class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.image('blankSquare', '../Images/TTT/blankSquare.png')
        this.load.image('PlX', '../Images/TTT/X.png')
        this.load.image('PlO', '../Images/TTT/O.png')
    }
    create() {
        this.scene.start("PlayGameScene");
    }
}

class PlayGameScene extends Phaser.Scene {
    constructor() {
        super('PlayGameScene');
    }
    create() {
        let self = this;
        self.whoseTurn = PLAYER_X;

        let blankSquareSize = 200;
        let halfBlankSquareSize = 100;
        let nKey = 0;

        for (let row = 1; row <= 3; row++) {
            let y = halfBlankSquareSize + (blankSquareSize * (row - 1)) + ((row - 1) * 10);
            for (let col = 1; col <= 3; col++) {
                let x = halfBlankSquareSize + (blankSquareSize * (col - 1)) + ((col - 1) * 10);

                let blank = this.add.image(x, y, 'blankSquare');
                blank.myKey = nKey++;
                blank.occupiedBy = NONE;
                blank.setInteractive();
                blank.on('pointerdown', this.handleClick);

                let textVal = 'myKey: ' + blank.myKey.toString();
                let label = this.add.text(x, y, textVal,
                    { fontSize: '16px Arial', fill: '#000' });
                label.setOrigin(0.5, 0.5);

            
                //this.add.image(x, y, 'blankSquare');
            }
        }
        IO = this.add.sprite(100, 100, 'PlO', 0);
        IO.width = 100;
        IO.height = 100;
        this.playerO = IO;
        IX = this.add.sprite(520, 520, 'PlX', 1);
        IX.width = 100;
        IX.height = 100;
        this.playerX = IX;
    }

    handleClick(event) {
        let owner = this.scene;
        console.log("occupiedBy: " + this.occupiedBy); // this is our image object
        let wt = owner.whoseTurn;
        wt = (wt === PLAYER_X) ? PLAYER_O : PLAYER_X;
        owner.whoseTurn = wt;

        owner.whoseTurnIsIt();
    }

    whoseTurnIsIt() {
        let x = this.game.config.width / 2;
        let y = this.game.config.height / 2;
        let t = (this.whoseTurn == PLAYER_X ? "PLAYER X" : "PLAYER O");

        let label = this.add.text(x, y, t,
            { fontSize: '72px Arial', fill: '#F00' });
        label.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: label,
            alpha: 0,
            ease: 'Power1',
            duration: 1000,
        });
    }
}