import { TiledTileMaps } from '~/Config/constants'
import { Zone, ZoneTypes } from '~/Store/Zone/ZoneModel'
import { Map } from '~/Store/Map/MapModel'
import { Game } from '~/Store/Game/GameModel'

export const Store = new Game({})

Store.addZones([
  new Zone({
    name: 'LevelOneScene',
    type: ZoneTypes.Dungeon,
    isStart: true,
    map: new Map(TiledTileMaps.LevelOne)
  }),
  new Zone({
    name: 'LevelTwoScene',
    type: ZoneTypes.Dungeon,
    map: new Map(TiledTileMaps.LevelTwo)
  }),
  new Zone({
    name: 'LevelThreeScene',
    type: ZoneTypes.Dungeon,
    map: new Map(TiledTileMaps.LevelThree)
  })
])
