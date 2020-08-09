import { TiledTileMaps } from '~/Config/constants'
import { Zone } from '~/Store/Zone/ZoneModel'
import { Map } from '~/Store/Map/MapModel'

export const LevelOne = new Zone({
  name: 'LevelOneScene',
  type: Zone.Types.Dungeon,
  map: new Map(TiledTileMaps.LevelOne)
})
