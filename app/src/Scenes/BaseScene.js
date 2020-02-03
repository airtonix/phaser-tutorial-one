import Phaser from "phaser"

export class BaseScene extends Phaser.Scene {

    constructor (config) {
        console.log(`[Scene] ${config.key}`)
        super({ ...config })
    }

}
