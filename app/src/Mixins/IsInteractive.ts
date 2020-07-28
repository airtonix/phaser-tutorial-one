import { throttle } from 'lodash'
import { Constructor } from '~/Core/framework'
import { WritesLogs } from "./WritesLogs";

export function IsInteractive<TBase extends Constructor>(Base: TBase) {
    return class IsInteractive extends WritesLogs(Base) {

        on: (eventName: string, handler: CallableFunction) => void

        constructor (...args: any[]) {
            super(...args)
            this.log('IsInteractive')
            this.on('perform-use', this.handlePerformUse)

            this.scene.physics.add.existing(this)
            this.scene.physics.world.enable(this)
        }

        handlePerformUse = throttle((...args: any[]) => {
            super.handlePerformUse(...args)
        }, 500)

    }
}