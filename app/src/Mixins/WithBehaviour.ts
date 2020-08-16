import { get, throttle } from 'lodash'
import { BehaviourTree } from 'mistreevous'

import { Constructor } from '~/Core/framework';

import { WritesLogs } from './WritesLogs';


export function WithBehaviour<TBase extends Constructor> (Base: TBase) {

  return class WithBehaviour extends WritesLogs(Base) {
    behaviour: BehaviourTree
    behaviours: object

    constructor (...args: any[]) {
      super(...args)
      this.setBehaviour('default')
    }

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
      super.update(time, delta)
      this.stepBehaviour()
    }
  }
}
