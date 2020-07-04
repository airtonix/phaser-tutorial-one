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
            backgroundColor: '#000',

            parent: 'game_content',

            width: window.innerWidth,
            height: window.innerHeight,
            physics: {
                default: 'arcade',
                arcade: {
                    // debug: true,
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
