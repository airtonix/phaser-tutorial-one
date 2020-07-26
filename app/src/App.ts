import { Logger } from '~/Core/Logger'
import { Game } from '~/Game'

const log = Logger(module.id)

export interface IApp {
    game: Phaser.Game
}

declare global {
    // tslint:disable-next-line: interface-name
    interface Window {
        App: IApp
    }
}

class App implements IApp {

    public static launch = () => {
        window.App = new App()
    }

    public game: Game

    constructor () {
        log('start')
        this.game = new Game();
    }

}

window.onload = App.launch
