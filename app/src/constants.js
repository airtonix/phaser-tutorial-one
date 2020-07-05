const TilesetOneExtruded = '/0x72_DungeonTilesetII_v1.3--extruded.png'
const TilesetOne = '/0x72_DungeonTilesetII_v1.3.png'
const TilesetTwo = '/16x16 dungeon ii wall reconfig v04 spritesheet.png'
const LevelOneTiledTileMap = '/LevelOne.json'

export const FrameConfig16x16 = {
    frameWidth: 16,
    frameHeight: 16,
}

export const Orientation = {
    Down: 'down',
    Left: 'left',
    Right: 'right',
    Up: 'up',
}

export const SpriteSheets = {
    Dungeon: {
        key: 'DungeonSpriteSheet',
        url: TilesetOne,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
        }
    },

    Characters: {
        key: 'Characters',
        url: TilesetOneExtruded,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 32,
            spacing: 2,
            margin: 1
        }
    },

    TilesetTwo: {
        key: 'TilesetTwo',
        url: TilesetTwo,
        frameConfig: FrameConfig16x16
    }
}

export const Images = {
    DungeonTiles: {
        key: 'DungeonTiles',
        url: TilesetOne
    },
}

export const TiledTileMaps = {
    LevelOne: {
        key: 'LevelOneTiledMap',
        url: LevelOneTiledTileMap,
        tileset: Images.DungeonTiles.key,
        tileimage: Images.DungeonTiles.key,
    }
}

export const Animations = {
    PlayerWarriorMove: {
        key: 'PlayerWarriorMove',
        frameRate: 8,
        repeat: -1,
        padding: 1,
        frames: [ 76, 77, 78, 79, ],
        sheet: SpriteSheets.Characters.key,
    },

    PlayerWarriorIdle: {
        key: 'PlayerWarriorIdle',
        sheet: SpriteSheets.Characters.key,
        frames: [ 72, 73, 74, 75 ],
        margin: 1,
        frameRate: 4,
        repeat: -1
    },
}