import debug from 'debug'
import { LOG_PREFIX } from '~/constants'
import { Constructor } from '~/Base'

export function WritesLogs<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        key: string
        logger: Function

        constructor (...args: any[]) {
            super(...args)
            this.createLogger(this.key)
        }

        createLogger (key) {
            this.logger = debug(`${LOG_PREFIX}.${key}`)
            this.logger(`WritesLogs`)
        }

        log (...messages) {
            this.logger(...messages)
        }
    }
}