import Phaser from 'phaser'
import { WritesLogs } from '~Mixins/WritesLogs'

export interface SceneProps {
    key?: string
    [x: string]: any
}

@WritesLogs
export class BaseScene extends Phaser.Scene {
    isInteractive: boolean
    key: string
    props: SceneProps
    // eslint-disable-next-line @typescript-eslint/ban-types
    keys: object
    log: (...args: any[]) => void

    constructor ({ key, ...props}: SceneProps) {
        super({
            key,
            ...props
        })
        this.key = key
        this.props = props
    }

    create (): void {
        if (this.isInteractive) {
            this.log('create.isInteractive')
            this.keys = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
                use: Phaser.Input.Keyboard.KeyCodes.E,
                inventory: Phaser.Input.Keyboard.KeyCodes.I,
            })
        }
    }
}