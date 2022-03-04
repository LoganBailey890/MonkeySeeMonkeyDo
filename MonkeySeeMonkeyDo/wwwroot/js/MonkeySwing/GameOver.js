class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOverScreen")
    }

    preload() {
        this.load.image("background", "/*insert image path here*/");
    }

    create() {
        let background = this.add.image(0, 0, "background");
        background.setOrigin(0, 0);
    }
}

export default GameOver;