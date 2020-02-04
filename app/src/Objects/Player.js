/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */

import Actor from "./Actor"

export default class Player extends Actor {
    static SPRITE_FRAME_HEIGHT = 50
    static SPRITE_FRAME_WIDTH = 40

    constructor(scene, x, y) {
        super({
            name: "Player",
            scene,
            x,
            y,
            w: 20,
            h: 10,
            health: 100,
            maxHealth: 100
        })

        this.keys = scene.input.keyboard.createCursorKeys()

    }

    update() {
        const keys = this.keys
        const prevVelocity = this.preMove()


        if (keys.up.isDown && keys.right.isDown) {
            this.moveNorthEast()
        }
        else if (keys.up.isDown && keys.left.isDown) {
            this.moveNorthWest()
        }
        else if (keys.up.isDown) {
            this.moveNorth()
        }
        else if (keys.down.isDown && keys.left.isDown) {
            this.moveSouthWest()
        }
        else if (keys.down.isDown && keys.right.isDown) {
            this.moveSouthEast()
        }
        else if (keys.down.isDown) {
            this.moveSouth()
        }
        else if (keys.left.isDown) {
            this.moveWest()
        }
        else if (keys.right.isDown) {
            this.moveEast()
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
