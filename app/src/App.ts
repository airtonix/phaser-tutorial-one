import { Logger } from '~/core/Logger'
import { IApp } from '~/core/types/App'
import { Game } from '~/Game'

const log = Logger(module.id)

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
