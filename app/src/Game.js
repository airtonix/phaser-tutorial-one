import Phaser from 'phaser'

import { PreloaderScene } from './Scenes/PreloaderScene'
import { MenuScene } from './Scenes/MenuScene'
import { InterfaceScene } from './Scenes/InterfaceScene'
import { LevelOneScene } from './Scenes/LevelOneScene'


export class Game extends Phaser.Game {

    constructor() {
        // init game
        super({
            title: 'Maintainable Game',

            type: Phaser.AUTO,
            pixelArt: true,
            backgroundColor: '#000',

            parent: 'game_content',

            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },

            scene: [
                PreloaderScene,
                MenuScene,
                InterfaceScene,
                LevelOneScene,
            ]
        })
    }
}
