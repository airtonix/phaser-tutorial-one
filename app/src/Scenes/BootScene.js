import {BaseScene} from "./BaseScene"

export class BootScene extends BaseScene {

    constructor () {
        super({ key: "Boot" })
    }

    preload () {

    }

    create () {
        this.scene.start("Preloader")
    }
}
