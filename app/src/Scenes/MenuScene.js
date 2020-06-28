import Phaser from 'phaser'

import { LogoImage } from '~/Images/LogoImage'
import { TextButton } from '~/Objects/TextButton'
import { BaseScene } from './BaseScene'

export class MenuScene extends BaseScene {
    constructor () {
        super({ key: 'Menu' })
    }

    create () {
        this.logo = new LogoImage(this, 400, 150)

        Phaser.Display.Align.In.Center(
            this.logo,
            this.add.zone(400, 300, 800, 600)
        )

        this.startButton = new TextButton({
            scene: this,
            x: 100,
            y: 100,
            text: 'Start',
            style: { fill: '#fff'},
            onClick: this.handleStartButtonClick
        })

        this.add.existing(this.startButton)

    }

    handleStartButtonClick = () => {
        this.scene.launch('LevelOne')
        this.scene.launch('Interface')
    }
}
