import { throttle } from 'lodash'
import { Constructor } from "~/Base";
import { WritesLogs } from "./WritesLogs";

export function IsInteractive<TBase extends Constructor>(Base: TBase) {
    return class IsInteractive extends WritesLogs(Base) {

        constructor (...args: any[]) {
            super(...args)
            this.log('IsInteractive')
            this.on('perform-use', this.onPerformUse)
        }

        onPerformUse = throttle((event) => {
            this.log('onPerformUse', event)
        }, 500)

    }
}