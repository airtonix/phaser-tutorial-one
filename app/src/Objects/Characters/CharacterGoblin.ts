// import { State } from 'mistreevous'
// import { PhaserNavmesh } from 'phaser-navmesh'

import { Animations } from '~/Config/constants'
// import { SidekickCharacterBehaviour } from '~/Behaviours/SidekickCharacterBehaviour'
// import { getDistance, IPosition, position } from '~/Core/distance'
// import { MapScene } from '~/Scenes/MapScene'

import { CharacterGameObject } from './Character'

export class GoblinGameObject extends CharacterGameObject {
  key = 'Goblin'
  animations = {
    default: {
      default: { anim: Animations.GoblinIdle }
    },
    idle: {
      default: { anim: Animations.GoblinIdle }
    },
    moving: {
      default: { anim: Animations.GoblinMove },
      Down: { anim: Animations.GoblinMove },
      LeftDown: { flip: true, anim: Animations.GoblinMove },
      Left: { flip: true, anim: Animations.GoblinMove },
      LeftUp: { flip: true, anim: Animations.GoblinMove },
      Up: { anim: Animations.GoblinMove },
      RightUp: { flip: false, anim: Animations.GoblinMove },
      Right: { flip: false, anim: Animations.GoblinMove },
      RightDown: { flip: false, anim: Animations.GoblinMove },
    },
  }

  constructor (
    scene: Phaser.Scene,
    x?: number,
    y?: number
  ) {
    super(scene, x, y)
    this.init()
  }

  init (): void {
    super.init()
  }
}


// export class SidekickGoblin
//   extends classes(
//     Goblin,
//     WithBehaviour,
//     WritesLogs
//   ) {
//     static key = 'SidekickGoblin'
//     behaviours = {
//       default: SidekickCharacterBehaviour
//     }
//     target: Character
//     visionDistance = 50
//     hearingDistance = 40
//     currentTarget: Phaser.Math.Vector2 | null | undefined
//     path: Phaser.Math.Vector2[]
//     navmesh: PhaserNavmesh

//     constructor (
//       scene: MapScene,
//       navmesh: PhaserNavmesh
//     ) {
//       super(
//         { super: WritesLogs, arguments: [{ key: SidekickGoblin.key }]}
//       )
//       this.key = SidekickGoblin.key
//       this.navmesh = navmesh
//       this.path = []
//     }

//     setTarget (actor: Character): void {
//       this.target = actor
//     }

//     getDistanceToTarget (): number {
//       if (!this.target) return Infinity

//       const here: IPosition = {
//         x: this.x,
//         y: this.y
//       }
//       const there: IPosition = {
//         x: this.target.x,
//         y: this.target.y,
//       }
//       const distance = getDistance(here, there)
//       return distance
//     }

//     /**
//      * Can this character see the player?
//      * @type Behaviour Condition
//      */
//     CanSeeTargetCondition (): boolean {
//       if (!this.target) return false
//       return this.getDistanceToTarget() <= this.visionDistance
//     }

//     /**
//      * Is this character close to the player?
//      * @type Behaviour Condition
//      */
//     IsCanTouchTargetCondition = (): boolean => {
//       if (!this.target) return false
//       return this.getDistanceToTarget() <= this.usageDistance
//     }

//     CircleTargetAction = (): State => {
//       return State.SUCCEEDED
//     }

//     MoveTowardsTargetAction = (): State => {
//       const here = position(this)
//       const there = position(this.target)
//       const path = this.navmesh.findPath(here, there)
//       if (!path) State.FAILED

//       this.navmesh.debugDrawClear()
//       this.navmesh.debugDrawPath(path, 0xffd900)

//       const next = path[1]
//       this.log('MoveTowardsPlayerAction.rotation', this.rotation)
//       this.log('MoveTowardsPlayerAction.here', here)
//       this.log('MoveTowardsPlayerAction.next', next)

//       const angle = Math.floor(Phaser.Math.Angle
//         .BetweenPoints(here, next))
//       const angleCw = Phaser.Math.Angle.CounterClockwise(angle)
//       this.log('MoveTowardsPlayerAction.angle', angle)
//       this.log('MoveTowardsPlayerAction.angleCw', angleCw)
//       const anglePercent = angle * 100
//       const anglePercentCw = Phaser.Math.Angle.CounterClockwise(anglePercent)
//       this.log('MoveTowardsPlayerAction.anglePercent', anglePercent)
//       this.log('MoveTowardsPlayerAction.anglePercentCw', anglePercentCw)

//       this.isMoving = true

//       switch (anglePercentCw) {
//         case 1: this.orientation = Orientation.Left
//         case 3: this.orientation = Orientation.Right
//         case 5: this.orientation = Orientation.Up
//         case 6: this.orientation = Orientation.Down
//       }

//       return State.SUCCEEDED
//     }

//     EmoteLoveAction (): State {
//       this.showEmoteFrame(Emotes.Default.frames.Love)
//       this.navmesh.disableDebug()
//       return State.SUCCEEDED
//     }

//     EmoteIdeaAction (): State {
//       this.showEmoteFrame(Emotes.Default.frames.Idea)
//       return State.SUCCEEDED
//     }

//     EmoteQueryAction (): State {
//       this.showEmoteFrame(Emotes.Default.frames.Query)
//       return State.SUCCEEDED
//     }

//     IdleAction = (): State => {
//       this.isMoving = false
//       return State.SUCCEEDED
//     }

//     MeanderAction (): State {
//       this.orientation === Orientation.Left
//       this.isMoving = true
//       return State.SUCCEEDED
//     }

// }
