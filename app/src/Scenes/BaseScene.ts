import Phaser from 'phaser'

import { WritesLogs } from '~/Mixins/WritesLogs'

export interface SceneProps {
    key?: string
    [x: string]: any
}

@WritesLogs
export class BaseScene extends Phaser.Scene {
    isInteractive: boolean
    key: string
    props: SceneProps
    log: (...args: any[]) => void

    constructor ({ key, ...props}: SceneProps) {
        super({
            key,
            ...props,
        })
        this.props = props
    }

    public create (): void {
        return
    }
}
