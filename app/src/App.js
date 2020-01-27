import {Game} from './Game'

class App {

    constructor (config = {}) {
        console.log("Launching Game")
        this.game = new Game(config);
    }

    static launch = () => {
        window.App = new App()
    }
}

window.onload = App.launch
