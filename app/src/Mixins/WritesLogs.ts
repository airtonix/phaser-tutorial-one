import { Logger } from '~/Core/Logger'
import { Constructor } from '~/Core/framework'

export function WritesLogs<TBase extends Constructor> (Base: TBase) {
    return class extends Base {
        key: string
        logger: typeof Logger

        constructor (...args: any[]) {
            super(...args)
            this.createLogger(this.key)
        }

        createLogger (key: string) {
            this.logger = Logger(key)
            this.logger('WritesLogs')
        }

        log (...messages: any[]) {
            this.logger(...messages)
        }
    }
}