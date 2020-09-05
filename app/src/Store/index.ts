import { registerRootStore } from 'mobx-keystone'
import localForage from 'localforage'
import { persist } from 'mobx-keystone-persist'

import { APP_ID } from '~/Config/constants'
import { Logger } from '~/Core/Logger'

import { Store } from './store'

const log = Logger(module.id)

registerRootStore(Store)
persist(
  APP_ID,
  Store,
  {
    storage: localForage,
    jsonify: false
  }
).then(() => log('someStore has been hydrated'))

export { Store }
