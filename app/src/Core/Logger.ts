import debug from 'debug'

import { APP_ID } from '~/Config/constants'

export function Logger (namespace: string) {
    return debug([APP_ID, namespace].join('.'))
}