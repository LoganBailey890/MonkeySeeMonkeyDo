var nextScene;

class TitleScene extends Phaser.Scene {

    constructor(scene) {
        nextScene = scene
        super("TitleScene")
    }

    preload() {
        this.load.image("background", "./images/swing/forest.png");
    }

    create() {
        let background = this.add.image(0, 0, "background");
        background.setOrigin(0, 0);

        /*this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);*/
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start(nextScene);
        }
    }
}

export default TitleScene;