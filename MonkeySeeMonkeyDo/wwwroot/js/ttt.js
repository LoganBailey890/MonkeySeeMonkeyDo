const NONE = 0;
const PX = 1;
const PO = 2;

var game;

window.onload = function () {
	var config = {
		type: Phaser.AUTO,
		width: 620,
		height: 620,
		backgroundColor: 0x000000,
		scene: [BootScene, PlayGameScene],
	};

	var game = new Phaser.Game(config);
}

class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScene');
	}

	preload() {
		this.load.image('blankSquare', '../Images/TTT/blankSquare.png');
		this.load.image('PlayerX', '../Images/TTT/X2.png');
		this.load.image('PlayerO', '../Images/TTT/O2.png');
	}

	create() {
		this.scene.start('PlayGameScene');
	}
}

class PlayGameScene extends Phaser.Scene {
	constructor() {
		super('PlayGameScene');
	}

	create() {
		let self = this;			// assign the class instance to 'self'
		self.whoseTurn = PX;

		self.boardArray = [];

		let blankSquareSize = 200;          // 200x200 square
		let halfBlankSquareSize = 100;

		let nKey = 0;
		for (let row = 0; row < 3; row++) {
			let y = halfBlankSquareSize + (blankSquareSize * row) + (row * 10);

			for (let col = 0; col < 3; col++) {
				let x = halfBlankSquareSize + (blankSquareSize * col) +
					(col * 10);

				let blankSquare = self.add.image(x, y, 'blankSquare');

				blankSquare.myKey = nKey++;
				blankSquare.occupiedBy = NONE;

				blankSquare.setInteractive();
				blankSquare.on('pointerdown', self.handleClick);

				self.boardArray.push({
					occupiedBy: NONE,
					playerSprite: null,
				});

				let textVal = 'myKey: ' + blankSquare.myKey.toString();
				let label = self.add.text(x, y, textVal,
					{ fontSize: '16px Arial', fill: '#000' });
				label.setOrigin(0.5, 0.5);
			}
		}

		self.whoseTurnIsIt();
	}

	handleClick(event) {
		tweens.killAll();

		let offset = this.myKey;
		let owner = this.scene;

		let occupiedBy = owner.boardArray[offset].occupiedBy;
		console.log("occupiedBy: " + occupiedBy);

		let playerSprite;
		if (occupiedBy == NONE) {
			if (owner.whoseTurn == PX) {
				playerSprite = owner.add.sprite(this.x, this.y,
					'PlayerX', 1);

				occupiedBy = PX;
			} else {
				playerSprite = owner.add.sprite(this.x, this.y,
					'PlayerO', 0);

				occupiedBy = PO;
			}

			owner.boardArray[offset].occupiedBy = occupiedBy;

			owner.checkForWinner(owner.whoseTurn);

			if (owner.whoseTurn == PX) {
				owner.whoseTurn = PO;
			} else {
				owner.whoseTurn = PX;
			}
			owner.boardArray[offset].playerSprite = playerSprite;
		}

		owner.whoseTurnIsIt();
	}



	whoseTurnIsIt() {
		let x = this.game.config.width / 2;
		let y = this.game.config.height / 2;
		let t = (this.whoseTurn == PX ? "PLAYER X" : "PLAYER O");

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

	checkForWinner(playerID) {
		let winLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 4, 8],
			[2, 4, 6],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8]
		];

		for (let line = 0; line < winLines.length; line++) {
			let winLine = winLines[line];

			if ((this.boardArray[winLine[0]].occupiedBy == playerID) &&
				(this.boardArray[winLine[1]].occupiedBy == playerID) &&
				(this.boardArray[winLine[2]].occupiedBy == playerID)) {
				this.broadcastWinner(playerID, winLine);
				return true;
			}
		}

		let movesLeft = false;
		for (let n = 0; n < this.boardArray.length; n++) {
			if (this.boardArray[n].occupiedBy == NONE) {
				movesLeft = true;
			}
		}

		if (!movesLeft) {
			this.broadcastWinner(NONE);
		}

		return false;
	}

	broadcastWinner(playerID, winLine) {
		this.gameOver = true;
		this.tweens.killAll();

		let x = this.game.config.width / 2;
		let y = this.game.config.height / 2;

		let t;

		if (playerID == PX) {
			t = "X WINS!";
		} else if (playerID == PO) {
			t = "O WINS!";
		} else {
			t = "TIE GAME.";
		}

		let label = this.add.text(x, y, t,
			{ fontSize: '104px Arial', fill: '#00F', backgroundColor: '#00F' });
		label.setOrigin(0.5, 0.5);

		label.setInteractive();

		label.on('pointerdown', function () {
			this.scene.start('PlayGameScene');
		}, this);

		label = this.add.text(x, y, t,
			{ fontSize: '104px Arial', fill: '#0F0' });
		label.setOrigin(0.5, 0.5);

		this.tweens.add({
			targets: label,
			alpha: 0,
			ease: 'Power1',
			duration: 1000,
			yoyo: true,
			repeat: -1
		});

		if (playerID == PO || playerID == PX) {
			for (let n = 0; n <= winLine.length; n++) {
				let sprite = this.boardArray[winLine[n]].playerSprite;

				this.tweens.add({
					targets: sprite,
					angle: 360,
					ease: 'None',
					duration: 1000,
					repeat: -1
				});
			}
		}
	}
}