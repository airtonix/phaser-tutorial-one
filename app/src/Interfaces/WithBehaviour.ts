import { BehaviourTree } from 'mistreevous'
import { throttle } from 'lodash'

export class WithBehaviour {
    behaviour: object

    public stepBehaviour = throttle(() => {
        if (!this.behaviour) return

        if (!(this.behaviour instanceof BehaviourTree)) {
            this.log('behaviour is not a BehaviourTree')
            return
        }
        this.log('behaviour.step')
        this.behaviour.step()
    }, 200)

    public setBehaviour (behaviourName) {
        this.log('setBehaviour', behaviourName)
        const {
            behaviours = {}
        } = this.props
        const behaviour = get(behaviours, behaviourName, {})
        this.behaviour = new BehaviourTree(behaviour, this)
        this.behaviour.step()
    }

    public update (time, delta) {
        this.stepBehaviour()
    }
}