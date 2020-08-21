import { TiledTileMaps } from '~/Config/constants'
import { Zone, ZoneTypes } from '~/Store/Zone/ZoneModel'
import { Game } from '~/Store/Game/GameModel'


export const Store = new Game({})

window.Store = Store
