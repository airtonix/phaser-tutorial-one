import { throttle } from 'lodash'

import { WritesLogs } from './WritesLogs';

import { Constructor } from '~/Core/framework'

export const EVENT_KEY_USE = 'perform-use'

export function IsInteractive<TBase extends Constructor> (Base: TBase) {
    return class IsInteractive extends WritesLogs(Base) {

        on: (eventName: string, handler: CallableFunction) => void

        constructor (...args: any[]) {
            super(...args)
            this.log('IsInteractive')
            this.on(EVENT_KEY_USE, this.handlePerformUse)

            this.scene.physics.add.existing(this)
            this.scene.physics.world.enable(this)
        }

        handlePerformUse = throttle((...args: any[]) => {
            super.handlePerformUse(...args)
        }, 500)

    }
}