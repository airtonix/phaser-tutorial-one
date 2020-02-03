import Phaser from "phaser"

import {BaseScene} from "./BaseScene"
import { LogoImage } from "../Images/LogoImage"

import {TextButton} from "../Objects/TextButton"

export class MenuScene extends BaseScene {
    constructor () {
        super({ key: "Menu" })
    }

    create () {
        this.logo = new LogoImage(this, 400, 150)

        Phaser.Display.Align.In.Center(
            this.logo,
            this.add.zone(400, 300, 800, 600)
        )
        this.startButton = new TextButton(
            this, 100, 100, "Start", { fill: "#fff"}
        )
        this.startButton
            .on("pointerup", this.onStartButtonClick)

        this.add.existing(this.startButton)

    }

    update () {
    }

  onStartButtonClick = () => {
      this.scene.start("Game")
  }
}
