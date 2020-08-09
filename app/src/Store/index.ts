import * as remotedev from 'remotedev'
import localForage from 'localforage'
import { persist } from 'mobx-keystone-persist'
import { connectReduxDevTools, registerRootStore } from 'mobx-keystone'

import { APP_ID } from '~/Config/constants'
import { Logger } from '~/Core/Logger'
import { LevelOne } from '~/Store/InitialState'

import { Game } from './Game/GameModel'

const log = Logger('Store')
export const Store = new Game({})
Store.addZone(LevelOne)

registerRootStore(Store)
// persist(
//   APP_ID,
//   Store,
//   {
//     storage: localForage,
//     jsonify: false
//   }
// ).then(() => log('someStore has been hydrated'))

const connection = remotedev.connectViaExtension({
  name: 'GameStore',
})
connectReduxDevTools(remotedev, connection, Store)

window.Store = Store