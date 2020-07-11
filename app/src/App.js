import {Game} from './Game'

class App {
    constructor (config = {}) {
        console.log('Launching Game')
        this.game = new Game(config)
    }
}

window.onload = () => {
    window.App = new App()
}
