import { BaseScene } from './BaseScene'
import { TextButton } from '~/Objects/TextButton'
import { PlayerWarrior } from '~/Objects/PlayerWarrior'

export class MenuScene extends BaseScene {
    constructor () {
        super({ key: 'Menu' })
    }

    create () {
        const { width, height } = this.cameras.main

        this.logo = new PlayerWarrior({
            scene: this,
            width: 16,
            height: 32,
            x: (width / 2) - 16,
            y: (height / 2) - 32
        })
        this.logo.sprite.setDisplaySize(
            this.logo.sprite.width * 8,
            this.logo.sprite.height * 4
        )

        this.startButton = new TextButton({
            scene: this,
            x: width / 2,
            y: height / 2,
            text: 'Start',
            style: { fill: '#ffffff' },
            onClick: this.handleStartButtonClick
        })
        this.add.existing(this.startButton)

        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update () {
        // this.logo.update(this.cursors)
        this.logo.meander()
    }

    handleStartButtonClick = () => {
        this.scene.launch('LevelOne')
        this.scene.launch('Interface')
    }
}
