import { Mixin } from "ts-mixer";
import { IsPlayerControlled } from "~/Interfaces/IsPlayerControlled";
import { ShouldDisplay } from "~/Interfaces/ShouldDisplay";
import { CanMove } from "~/Interfaces/CanMove";
import { CanAnimate } from "~/Interfaces/CanAnimate";
import { CanInteract } from "~/Interfaces/CanInteract";

export class Player extends Mixin(
    CanMove,
    CanAnimate,
    CanInteract,
    ShouldDisplay,
    IsPlayerControlled,
) {

    constructor (...props) {
        super(...props)
        console.log('Player')
    }

    init (...props) {
        super.init(...props)
        console.log('Player.init', props)
        // this.createSprite()
    }

    update (time, delta, keys) {
        this.updateKeysPressed(time, delta, keys)
        this.updateMovements(time, delta)
        this.animateMovement(time, delta)
    }
}