import Phaser from "phaser"

export class LogoImage extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, "logo")
        scene.add.existing(this)
    }
}
