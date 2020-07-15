import { get } from 'lodash'
import { BehaviourTree } from 'mistreevous'
import { throttle } from 'lodash'
import { Constructor } from "~/Base";
import { WritesLogs } from './WritesLogs';

export function CanInteract<TBase extends Constructor>(Base: TBase) {
    return class WithBehaviour extends WritesLogs(Base) {
        behaviour: BehaviourTree
        behaviours: object

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
            const behaviour = get(this.behaviours, behaviourName, {})
            this.behaviour = new BehaviourTree(behaviour, this)
            this.behaviour.step()
        }

        public update (time, delta) {
            this.stepBehaviour()
        }
    }
}