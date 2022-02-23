var game;

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
        let blankSquareSize = 200;
        let halfBlankSquareSize = 100;
        for (let row = 0; row < 3; row++) {
            let y = halfBlankSquareSize + (blankSquareSize * row) + (row * 10);
            for (let col = 0; col < 3; col++) {
                let x = halfBlankSquareSize + (blankSquareSize * col) + (col * 10);
                this.add.image(x, y, 'blankSquare');
            }
        }
/*
        this.add.image(100, 100, 'blankSquare');
        this.add.image(310, 100, 'blankSquare');
        this.add.image(520, 100, 'blankSquare');

		this.add.image(100, 310, 'blankSquare');
		this.add.image(310, 310, 'blankSquare');
		this.add.image(520, 310, 'blankSquare');

		this.add.image(100, 520, 'blankSquare');
		this.add.image(310, 520, 'blankSquare');
		this.add.image(520, 520, 'blankSquare');*/
    }
}