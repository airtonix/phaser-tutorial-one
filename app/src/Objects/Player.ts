import { Constructor } from "~/Base";
import { IsPlayerControlled } from "~/Interfaces/IsPlayerControlled";
import { ShouldDisplay } from "~/Interfaces/ShouldDisplay";

export function Player<TBase extends Constructor>(Base: TBase) {
    return class extends IsPlayerControlled(ShouldDisplay(Base)) {
        constructor(...args: any[]) {
            super(...args)
            this.log('stuff')

            this.add(this.sprite)
            this.add(this.emote)
            this.add(this.shadow)

            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.scene.physics.world.enable(this)
        }

        update(time, delta, keys) {
            this.updateKeysPressed(time, delta, keys)
            this.updateMovements(time, delta)
            this.animateMovement(time, delta)
        }
    }
}