import { State } from 'mistreevous'
import { PhaserNavMesh } from 'phaser-navmesh'

import { Animations, Emotes, Orientation } from '~/Config/constants'
import { IsPlayerControlled } from '~/Mixins/IsPlayerControlled'
import { CanInteract } from '~/Mixins/CanInteract'
import { CanMove } from '~/Mixins/CanMove'
import { WithBehaviour } from '~/Mixins/WithBehaviour'
import { SidekickCharacterBehaviour } from '~/Behaviours/SidekickCharacterBehaviour'
import { getDistance, IPosition, position, directionTo } from '~/Core/distance'
import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'


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

    constructor (...args: any[]) {
      super(...args)
      this.scene.events.on('update', this.update, this);
      this.scene.events.once('shutdown', this.destroy, this);
    }

    destroy () : void {
      if (this.scene) this.scene.events.off('update', this.update, this);
      super.destroy();
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
export class SidekickGoblin extends Goblin {
  key = 'SidekickGoblin'
  behaviours = {
    default: SidekickCharacterBehaviour
  }
  visionDistance = 50
  hearingDistance = 40
  currentTarget: Phaser.Math.Vector2 | null | undefined
  path: Phaser.Math.Vector2[]
  navMesh: PhaserNavMesh

  constructor (scene, navmesh) {
    super(scene)
    this.navmesh = navmesh
    this.path = []
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
    const here = position(this)
    const there = position(this.player)
    const path = this.navmesh.findPath(here, there)
    if (!path) return

    this.navmesh.debugDrawClear()
    this.navmesh.debugDrawPath(path, 0xffd900)

    const next = path[1]
    this.log('MoveTowardsPlayerAction.rotation', this.rotation)
    this.log('MoveTowardsPlayerAction.here', here)
    this.log('MoveTowardsPlayerAction.next', next)

    const angle = Math.floor(Phaser.Math.Angle
      .BetweenPoints(here, next))
    const angleCw = Phaser.Math.Angle.CounterClockwise(angle)
    this.log('MoveTowardsPlayerAction.angle', angle)
    this.log('MoveTowardsPlayerAction.angleCw', angleCw)
    const anglePercent = angle * 100
    const anglePercentCw = Phaser.Math.Angle.CounterClockwise(anglePercent)
    this.log('MoveTowardsPlayerAction.anglePercent', anglePercent)
    this.log('MoveTowardsPlayerAction.anglePercentCw', anglePercentCw)

    this.isMoving = true

    switch (anglePercentCw) {
      case 1: this.orientation = Orientation.Left
      case 3: this.orientation = Orientation.Right
      case 5: this.orientation = Orientation.Up
      case 6: this.orientation = Orientation.Down
    }

    return State.SUCCEEDED
  }

  EmoteLoveAction (): symbol {
    this.showEmoteFrame(Emotes.Default.frames.Love)
    this.navmesh.disableDebug()
    return State.SUCCEEDED
  }

  EmoteIdeaAction (): symbol {
    this.showEmoteFrame(Emotes.Default.frames.Idea)
    return State.SUCCEEDED
  }

  EmoteQueryAction (): symbol {
    this.showEmoteFrame(Emotes.Default.frames.Query)
    return State.SUCCEEDED
  }

  IdleAction = (): symbol  => {
    this.isMoving = false
    return State.SUCCEEDED
  }

  MeanderAction (): symbol  {
    this.orientation === Orientation.Left
    this.isMoving = true
    return State.SUCCEEDED
  }

}
