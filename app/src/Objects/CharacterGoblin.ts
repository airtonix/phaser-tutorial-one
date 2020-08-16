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
import { State } from 'mistreevous'


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
    return this.getDistanceToPlayer() <= 100
  }

  /**
   * Is this character close to the player?
   * @type Behaviour Condition
   */
  IsCloseToPlayerCondition (): boolean {
    if (!this.player) return false
    return this.getDistanceToPlayer() <= 40
  }

  CirclePlayerAction () {
    this.log('Circling player')
    return State.SUCCEEDED
  }

  MoveTowardsPlayerAction() {
    const direction = directionTo(
      position(this.player),
      position(this),
    )
    this.log('Following player', direction)
    return State.SUCCEEDED
  }

  IsHungryCondition () {
    this.log('am i hungry?')
    return false
  }

  CanSeeFoodCondition () {
    this.log('can I see food')
    return false
  }

  EatFoodAction () {
    this.log('eat food')
    this.showEmoteFrame(Emotes.Default.frames.Happy)
    return State.SUCCEEDED
  }

  ComplainAction() {
    this.log('complain')
    this.showEmoteFrame(Emotes.Default.frames.Sad)
    return State.SUCCEEDED
  }

  WanderAction = () => {
    this.log('wandering')
    this.orientation = Phaser.Utils.Array
      .GetRandom(Object.values(Orientation))
    this.isMoving = true
    return State.SUCCEEDED
  }

  IdelAction = () => {
    this.log('idle')
    this.isMoving = false
    return State.SUCCEEDED
  }

  SleepAction () {
    this.log('sleeping')
    this.showEmoteFrame(Emotes.Default.frames.Tired)
    return State.SUCCEEDED
  }
}
