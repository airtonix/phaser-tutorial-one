// import { HealthBar } from './HealthBar'
import { debounce } from 'lodash'
import { Mixin, mix } from 'ts-mixer'
import { SpriteSheets } from '~/constants'
import { CanAnimate } from '~/Interfaces/CanAnimate'
import { CanMove } from '~/Interfaces/CanMove'
import { ShouldDisplay } from '~/Interfaces/ShouldDisplay'
import { WithBehaviour } from '~/Interfaces/WithBehaviour'
import { WithHealth } from '~/Interfaces/WithHealth'

export class Actor extends Mixin(
    CanAnimate,
    CanMove,
    ShouldDisplay,
    WithBehaviour,
    WithHealth,
    Phaser.GameObjects.Container
) {
    constructor(props) {
        super(props)
        this.emote = {
            width: 16,
            height: 16,
            sheet: SpriteSheets.EmotesStyleOne.key,
            frames: {
                Helpful: 7,
                Close: 23,
                Exclamation: 22,
                Star: 10,
                Cash: 9
            }
        }
    }

    stop = () => {
        if (!this.active) return
        this.log('stop')
        this.idle()
    }

    use = debounce(() => {
        console.log('use')
    }, 50)

    jump = debounce(() => {
        console.log('jump')
    }, 50)

}
