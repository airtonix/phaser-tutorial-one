import { Actor } from './Actor'

export class Player extends Actor {

    constructor(props) {
        super({
            ...props,
            key: `${props.key}.Player`,
            health: 100,
            maxHealth: 100,
        })
        this.idle()
    }

    update (keys) {
        this.isMoving = keys.left.isDown
            || keys.right.isDown
            || keys.down.isDown
            || keys.up.isDown

        this.preMotion()

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


        this.postMotion()

        if (!this.isMoving && !this.isIdle) {
            this.idle()
        }
    }

}
