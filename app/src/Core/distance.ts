export function diff (num1, num2) : integer {
  return (num1 > num2)
    ? (num1 - num2)
    : (num2 - num1)
}

export function getDistance (here: IPosition, there: IPosition) : integer {
  return Phaser.Math.Distance.BetweenPoints(here, there)
}

export function isWithin (distance: integer, fromActor: IPosition, toActor: IPosition) : boolean {
  return getDistance(fromActor, toActor) < distance
}

export interface IPosition {
    x: integer
    y: integer
}

export function position (actor) : IPosition {
  const { x, y } = actor
  return { x, y }
}

export function directionTo (fromPosition, toPosition) : integer {
  return Phaser.Math.Angle.Between(
    fromPosition.x,
    fromPosition.y,
    toPosition.x,
    toPosition.y
  ) * 100
}
