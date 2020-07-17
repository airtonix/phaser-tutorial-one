import { Constructor } from "~/Base";
import { IsPlayerControlled } from "~/Mixins/IsPlayerControlled";
import { CanAnimate } from "~/Mixins/CanAnimate";

export function Player<TBase extends Constructor>(Base: TBase) {
    return class extends IsPlayerControlled(CanAnimate(Base)) {
        constructor(...args: any[]) {
            super(...args)
            this.log('Player')
        }

        update(time, delta, keys) {
            this.updateKeysPressed(time, delta, keys)
            this.updateMovements(time, delta)
            this.animateMovement()
        }
    }
}