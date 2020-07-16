import { Constructor } from "~/Base";
import { IsPlayerControlled } from "~/Interfaces/IsPlayerControlled";
import { ShouldDisplay } from "~/Interfaces/ShouldDisplay";

export function Player<TBase extends Constructor>(Base: TBase) {
    return class extends IsPlayerControlled(ShouldDisplay(Base)) {
        constructor(...args: any[]) {
            super(...args)
            this.log('stuff')
        }

        update(time, delta, keys) {
            this.updateKeysPressed(time, delta, keys)
            this.updateMovements(time, delta)
            this.animateMovement(time, delta)
        }
    }
}