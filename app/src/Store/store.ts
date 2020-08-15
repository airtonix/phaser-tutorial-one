import { TiledTileMaps } from '~/Config/constants'
import { Zone, ZoneTypes } from '~/Store/Zone/ZoneModel'
import { Game } from '~/Store/Game/GameModel'


const data = [
  {
    name: 'LevelOne',
    type: ZoneTypes.Dungeon,
    map: TiledTileMaps.LevelOne,
  },
  {
    name: 'LevelTwo',
    type: ZoneTypes.Dungeon,
    map: TiledTileMaps.LevelTwo,
  },
  {
    name: 'LevelThree',
    type: ZoneTypes.Dungeon,
    map: TiledTileMaps.LevelThree
  }
]

export const Store = new Game({})

data.forEach(({ name, type, map }) => {
  const LevelOneZone = new Zone({ name, type })
  LevelOneZone.addMapFromLevelData(map)
  Store.addZone(LevelOneZone)
})


window.Store = Store
