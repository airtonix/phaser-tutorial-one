import * as remotedev from 'remotedev'
import { connectReduxDevTools, registerRootStore } from 'mobx-keystone'
import localForage from 'localforage'
import { persist } from 'mobx-keystone-persist'

import { APP_ID } from '~/Config/constants'

import { Store } from './store'

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

export { Store }