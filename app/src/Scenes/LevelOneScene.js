import { MapScene } from './MapScene'

export class LevelOneScene extends MapScene {
    static Db = {
        tilesets: [ 'tiles' ],
        layers: [
            { name: 'ground', tilset: 'tiles',
            },
            { name: 'items', tilset: 'tiles',
            },
        ]
    }

    constructor() {
        super({ key: 'LevelOne', db: LevelOneScene.Db })
    }
}
