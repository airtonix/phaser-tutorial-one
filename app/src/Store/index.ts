import localForage from 'localforage'
import { persist } from 'mst-persist'

import { APP_ID } from '~/Config/constants'
import { Logger } from '~/Core/Logger'

import { GameMST, GameModel } from './Game/Game.model'
import { GameStore } from './Game/Game.store'

const log = Logger('Store')
const gameTS = new GameModel()
export const Store = GameStore
    .create({ ...gameTS })

persist(APP_ID, Store, {jsonify: false})
    .then(() => {
        log('hydrated')
    })

window.Store = Store