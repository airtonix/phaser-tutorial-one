/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */

import { Actor } from './Actor'

export class Player extends Actor {

    constructor(props) {
        super({
            name: 'Player',
            health: 100,
            maxHealth: 100,
            ...props
        })

        this.keys = this.scene.input.keyboard.createCursorKeys()

    }

    update() {
        const keys = this.keys
        const prevVelocity = this.preMove()

        // Horizontal movement
        if (keys.left.isDown) {
            this.moveLeft()
        }
        else if (keys.right.isDown) {
            this.moveRight()
        }

        // Vertical movement
        if (keys.up.isDown) {
            this.moveUp()
        }
        else if (keys.down.isDown) {
            this.moveDown()
        }

        this.postMove()

        // Update the animation last and give left/right/down animations precedence over up animations
        if (
            !keys.left.isDown
            && !keys.right.isDown
            && !keys.down.isDown
            && !keys.up.isDown) {
            // If we were moving & now we're not,
            // then pick a single idle frame to use
            if (prevVelocity.y < 0) {
                this.idle()
            } else {
                this.stop()
            }
        }

        super.update()
    }
}
