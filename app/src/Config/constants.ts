
import { range } from '~/Core/collections'

export const APP_ID = process.env.APP_ID || 'Game'
export const LOG_PREFIX = 'Game'

const UrlTilesetOneExtrudedSpritesheet = '/0x72_DungeonTilesetII_v1.3--extruded.png'
const UrlTilesetOneSpritesheet = '/0x72_DungeonTilesetII_v1.3.png'
const UrlLevelOneTiledTileMap = '/LevelOne.json'
const UrlLevelTwoTiledTileMap = '/LevelTwo.json'
const UrlLevelThreeTiledTileMap = '/LevelThree.json'
const UrlEmotesStyleOneSpritesheet = '/emotes_pixel_style1.png'
const UrlUiDialogNineSlice = '/interface_bg_tan.png'
const UrlItemsSpritesheet = '/items_spritesheet_16x16.png'
const UrlBlackSixteenbfZXFont = '/black_16bfZX.fnt'
const UrlBlackSixteenbfZXPng = '/black_16bfZX_0.png'
const UrlWhiteSixteenbfZXFont = '/white_16bfZX.fnt'
const UrlWhiteSixteenbfZXPng = '/white_16bfZX_0.png'


export const FrameConfig16x16 = {
  frameWidth: 16,
  frameHeight: 16,
}

export interface IOrientation {
  Left: boolean
  Right: boolean
  Up: boolean
  Down: boolean
}

export enum Orientation {
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Up = 'up',
}

export const COLOURS = {
  Grey: {
    Light: 0x999999,
    Default: 0x666666,
    Dark: 0x222222
  },
  White: {
    Default: 0xffffff
  }
}

export const SpriteSheets = {
  Dungeon: {
    key: 'DungeonSpriteSheet',
    url: UrlTilesetOneSpritesheet,
    frameConfig: {
      frameWidth: 16,
      frameHeight: 16,
    }
  },

  EmotesStyleOne: {
    key: 'EmotesStyleOne',
    url: UrlEmotesStyleOneSpritesheet,
    frameConfig: {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 0,
      margin: 0
    }
  },

  Characters: {
    key: 'Characters',
    url: UrlTilesetOneExtrudedSpritesheet,
    frameConfig: {
      frameWidth: 16,
      frameHeight: 32,
      spacing: 2,
      margin: 1
    }
  },

  Items: {
    key: 'Items',
    url: UrlItemsSpritesheet,
    frameConfig: FrameConfig16x16
  }
}

export const Images = {
  DungeonTiles: {
    key: 'Dungeon',
    url: UrlTilesetOneSpritesheet
  },
  UiDialogBg: {
    key: 'UiDialogBg',
    url: UrlUiDialogNineSlice
  },
}

export const BitmapFonts = {
  WhiteSixteenbfZXFont: {
    key: 'WhiteSixteenbfZXFont',
    png: UrlWhiteSixteenbfZXPng,
    fnt: UrlWhiteSixteenbfZXFont
  },
  BlackSixteenbfZXFont: {
    key: 'BlackSixteenbfZXFont',
    png: UrlBlackSixteenbfZXPng,
    fnt: UrlBlackSixteenbfZXFont
  }
}

export const Nineslices = {
  Dialog: {
    startX: 0,
    startY: 0,
    width: 48,
    height: 48,
    key: Images.UiDialogBg.key,
    cornerOffset: 16,
    border: 2
  }
}

export interface ITiledTileMapConfig {
  key: string,
  url: string,
  tileset: string,
  tileimage: string
}
export interface ITiledTileMaps {
  [key: string]: ITiledTileMapConfig
}

export const TiledTileMaps: ITiledTileMaps = {
  LevelOne: {
    key: 'LevelOneTiledMap',
    url: UrlLevelOneTiledTileMap,
    tileset: Images.DungeonTiles.key,
    tileimage: Images.DungeonTiles.key,
  },
  LevelTwo: {
    key: 'LevelTwoTiledMap',
    url: UrlLevelTwoTiledTileMap,
    tileset: Images.DungeonTiles.key,
    tileimage: Images.DungeonTiles.key,
  },
  LevelThree: {
    key: 'LevelThreeTiledMap',
    url: UrlLevelThreeTiledTileMap,
    tileset: Images.DungeonTiles.key,
    tileimage: Images.DungeonTiles.key,
  }
}

export const Animations = {
  WarriorMove: {
    key: 'WarriorMove',
    frameRate: 8,
    repeat: -1,
    padding: 1,
    frames: [ 76, 77, 78, 79, ],
    sheet: SpriteSheets.Characters.key,
  },

  WarriorJump: {
    key: 'WarriorJump',
    frameRate: 8,
    repeat: 0,
    padding: 1,
    frames: [ 75, 76, 77, 80, 80 ],
    sheet: SpriteSheets.Characters.key,
  },

  WarriorIdle: {
    key: 'WarriorIdle',
    sheet: SpriteSheets.Characters.key,
    frames: [ 72, 73, 74, 75 ],
    margin: 1,
    frameRate: 4,
    repeat: -1
  },

  GoblinMove: {
    key: 'GoblinMove',
    frameRate: 8,
    repeat: -1,
    padding: 1,
    frames: [ 59, 60, 61, 62, ],
    sheet: SpriteSheets.Dungeon.key,
  },

  GoblinIdle: {
    key: 'GoblinIdle',
    sheet: SpriteSheets.Dungeon.key,
    frames: [ 55, 56, 57, 58, ],
    margin: 1,
    frameRate: 4,
    repeat: -1
  },

  LootChestIdle: {
    key: 'LootChestIdle',
    sheet: SpriteSheets.Dungeon.key,
    frames: [ 595 ],
    repeat: 0,
    margin: 0,
    spacing: 0
  },

  LootChestOpenFull: {
    key: 'LootChestOpenFull',
    sheet: SpriteSheets.Dungeon.key,
    frames: [ 627, 628, 629 ],
    repeat: 0,
    margin: 0,
    spacing: 0
  },

  LootChestOpenEmpty: {
    key: 'LootChestOpenEmpty',
    sheet: SpriteSheets.Dungeon.key,
    frames: [ 595, 596, 597 ],
    repeat: 0,
    margin: 0,
    spacing: 0
  },

  LootChestCloseFull: {
    key: 'LootChestCloseFull',
    sheet: SpriteSheets.Dungeon.key,
    frames: [
      629,
      628,
      627,
    ],
    repeat: 0,
    margin: 0,
    spacing: 0
  },

  LootChestCloseEmpty: {
    key: 'LootChestCloseEmpty',
    sheet: SpriteSheets.Dungeon.key,
    frames: [ 597, 596, 595 ],
    repeat: 0,
    margin: 0,
    spacing: 0
  },

}

export const Emotes = {
  Default: {
    width: 16,
    height: 16,
    sheet: SpriteSheets.EmotesStyleOne.key,
    frames: {
      Stressed: 0, // @
      Chirpy: 1, // music
      Sad: 2, // :(
      Woops: 3, // teardrop
      Pious: 4, // halo
      Expletive: 5, // stars
      Laugh: 6, // haha
      Happy: 7, // :)
      SarcasticDisbelief: 8, // ...
      Greed: 9, // $
      Pride: 10, // star
      Idea: 11,
      Blank: 12,
      Sarcasm: 13,
      Attack: 14,
      Sleep: 15,
      Love: 16,
      Alarm: 17,
      Unsure: 18,
      Annoyed: 19,
      Tired: 20,
      Unlike: 21,
      Exclamation: 22,
      No: 23,
      Shocked: 24,
      Query: 25,
      Like: 26,
      BigWoops: 27,
      Despair: 28,
      Angry: 29,
    }
  }
}

export const ItemIcons = {
  armour: {
    sheet: SpriteSheets.Items,
    frames: range(0, 4)
  },
  artifact: {
    sheet: SpriteSheets.Items,
    frames: range(303, 317)
  },
  currency: {
    sheet: SpriteSheets.Items,
    frames: range(99, 123)
  },
  enchantment: {
    sheet: SpriteSheets.Items,
    frames: range(268, 272)
  },
  gem: {
    sheet: SpriteSheets.Items,
    frames: range(126, 135)
  },
  jewellery: {
    sheet: SpriteSheets.Items,
    frames: [
      ...range(208, 222),
      ...range(253, 267),
    ]
  },
  sword: {
    sheet: SpriteSheets.Items,
    frames: range(339, 343)
  },
  spear: {
    sheet: SpriteSheets.Items,
    frames: range(318, 322)
  },
  bow: {
    sheet: SpriteSheets.Items,
    frames: range(68, 82)
  },
}
