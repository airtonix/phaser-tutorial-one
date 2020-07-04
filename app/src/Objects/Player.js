/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */

import { Actor } from './Actor'

export class Player extends Actor {

    constructor(props) {
        super({
            ...props,
            key: `${props.key}.Player`,
            health: 100,
            maxHealth: 100,
        })
    }

    update (keys) {
        this.isMoving = keys.left.isDown
            || keys.right.isDown
            || keys.down.isDown
            || keys.up.isDown

        this.prevVelocity = this.preMotion()

        // Horizontal movement
        if (keys.left.isDown) {
            this.animateLeft()
            this.moveToLeft()
        }
        else if (keys.right.isDown) {
            this.moveToRight()
            this.animateRight()
        }

        // Vertical movement
        if (keys.up.isDown) {
            this.moveToUp()
            this.animateUp()
        }
        else if (keys.down.isDown) {
            this.moveToDown()
            this.animateDown()
        }

        // Update the animation last and give left/right/down animations precedence over up animations
        if (this.isMoving) {
            // If we were moving & now we're not,
            // then pick a single idle frame to use
            if (this.prevVelocity.y < 0) {
                this.idle()
            }
        }
        this.postMotion()
    }

}
