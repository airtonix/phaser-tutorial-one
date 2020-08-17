import { State } from 'mistreevous'

import { Animations, Emotes, Orientation } from '~/Config/constants'
import { IsPlayerControlled } from '~/Mixins/IsPlayerControlled'
import { CanInteract } from '~/Mixins/CanInteract'
import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'
import { CanMove } from '~/Mixins/CanMove'
import { WithBehaviour } from '~/Mixins/WithBehaviour'
import { SidekickCharacterBehaviour } from '~/Behaviours/SidekickCharacterBehaviour'
import { getDistance, IPosition, position, directionTo } from '~/Core/distance'


@CanAnimate
@CanEmote
@ShouldDisplay
export class Goblin extends Phaser.GameObjects.Container {
    key = 'Goblin'
    width = 16
    height = 16
    speed = 30
    footprintHeight = 8
    footprintWidth = 12
    usageDistance = 30
    animations = {
      idle: {
        default: { anim: Animations.GoblinIdle }
      },
      moving: {
        down: {anim: Animations.GoblinMove },
        up: {anim: Animations.GoblinMove },
        left: {flip: true, anim: Animations.GoblinMove },
        right: {flip: false, anim: Animations.GoblinMove },
      },
    }
}

@CanInteract
@CanMove
@IsPlayerControlled
export class PlayerGoblin extends Goblin {
  key = 'PlayerGoblin'
}

@CanMove
@WithBehaviour
export class SidekickGoblen extends Goblin {
  key = 'SidekickGoblen'
  behaviours = {
    default: SidekickCharacterBehaviour
  }
  visionDistance = 50
  hearingDistance = 40

  get player (): Phaser.GameObjects.Container | undefined {
    return this.scene?.player
  }

  getDistanceToPlayer (): number {
    if (!this.player) return Infinity

    const here: IPosition = {
      x: this.x,
      y: this.y
    }
    const there: IPosition = {
      x: this.player.x,
      y: this.player.y,
    }
    const distance = getDistance(here, there)
    return distance
  }

  /**
   * Can this character see the player?
   * @type Behaviour Condition
   */
  CanSeePlayerCondition (): boolean {
    if (!this.player) return false
    return this.getDistanceToPlayer() <= this.visionDistance
  }

  /**
   * Is this character close to the player?
   * @type Behaviour Condition
   */
  IsCanTouchPlayerCondition = (): boolean => {
    if (!this.player) return false
    return this.getDistanceToPlayer() <= this.usageDistance
  }

  CirclePlayerAction = () => {
    return State.SUCCEEDED
  }

  MoveTowardsPlayerAction = () => {
    const angle = directionTo(
      position(this.player),
      position(this),
    )
    const direction = Phaser.Math.Angle.CounterClockwise(angle)
    return State.SUCCEEDED
  }

  EmoteLoveAction () {
    this.showEmoteFrame(Emotes.Default.frames.Love)
    return State.SUCCEEDED
  }

  EmoteIdeaAction () {
    this.showEmoteFrame(Emotes.Default.frames.Idea)
    return State.SUCCEEDED
  }

  EmoteQueryAction () {
    this.showEmoteFrame(Emotes.Default.frames.Query)
    return State.SUCCEEDED
  }

  IdleAction = () => {
    this.isMoving = false
    return State.SUCCEEDED
  }

  WalkLeftAction () {
    this.orientation === Orientation.Left
    this.isMoving = true
    return State.SUCCEEDED
  }

  WalkRightAction () {
    this.orientation === Orientation.Right
    this.isMoving = true
    return State.SUCCEEDED
  }

  WalkUpAction () {
    this.orientation === Orientation.Up
    this.isMoving = true
    return State.SUCCEEDED
  }

  WalkDownAction () {
    this.orientation === Orientation.Down
    this.isMoving = true
    return State.SUCCEEDED
  }

}
