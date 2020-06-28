import { BaseScene } from './BaseScene'

import logo from '~/Images/logo.png'
import map from '~/Sprites/buch-tileset-48px-extruded.png'
import character from '~/Sprites/buch-characters-64px-extruded.png'

export class PreloaderScene extends BaseScene {
    constructor () {
        super({ key: 'Preloader' })
    }

    preload () {
        const progress = this.add.graphics()

        this.load.on('fileprogress', (file, value) => {
            progress.clear()
            progress.fillStyle(0xffffff, 0.75)
            progress.fillRect(700 - (value * 600), 250, value * 600, 100)
        })

        this.load.image('logo', logo)

        this.load.image('tiles', map)

        this.load.spritesheet('actors', character,
            {
                frameWidth: 64,
                frameHeight: 64,
                margin: 1,
                spacing: 2
            }
        )
    }

    create () {
        this.scene.start('Menu')
    }
}
