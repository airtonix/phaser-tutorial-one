import { Logger } from '~/Core/Logger'
import { Constructor } from '~/Core/framework'

export function WritesLogs<TBase extends Constructor> (Base: TBase) {
  return class extends Base {
    key: string
    log: typeof console.log

    constructor (...args: any[]) {
      super(...args)
      this.createLogger(this.key)
    }

    createLogger (key: string) {
      this.log = Logger(key)
      this.log('WritesLogs')
    }
  }
}
