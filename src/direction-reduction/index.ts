/**
  @see https://www.codewars.com/kata/550f22f4d758534c1100025a/train/javascript
  @description Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).
 */

export function dirReduc(directions: Direction[]) {
  let result: Direction[] = []

  for (const direction of directions) {
    const prev = result.slice(-1)[0]

    if (isOpposite(direction, prev)) {
      result.pop()
    } else {
      result.push(direction)
    }
  }

  return result
}

function isOpposite(dir1: Direction, dir2: Direction) {
  const opposites: Record<Direction, Direction> = {
    EAST: 'WEST',
    WEST: 'EAST',
    NORTH: 'SOUTH',
    SOUTH: 'NORTH',
  }

  return dir2 === opposites[dir1]
}

type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'
