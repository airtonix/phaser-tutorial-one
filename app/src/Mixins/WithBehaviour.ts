import { throttle } from 'lodash'
import { BehaviourTree } from 'mistreevous'

export type IBehaviourDefinition = string

export interface IBehaviours {
  default: IBehaviourDefinition,
  [key: string]: IBehaviourDefinition
}

export class WithBehaviour {
  behaviour: BehaviourTree
  behaviours: IBehaviours

  constructor () {
    this.setBehaviour('default')
  }

  public stepBehaviour = throttle(() => {
    if (!this.behaviour) return

    if (!(this.behaviour instanceof BehaviourTree)) {
      return
    }
    this.behaviour.step()
  }, 200)

  public setBehaviour (behaviourName: string): void {
    const behaviourDefinition: IBehaviourDefinition = this.behaviours[behaviourName]
    if (!behaviourDefinition) return

    this.behaviour = new BehaviourTree(behaviourDefinition, this)
    this.behaviour.step()
  }

  public update (): void {
    this.stepBehaviour()
  }
}
