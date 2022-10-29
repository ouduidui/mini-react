export type Lanes = number

export type Lane = number

export const NoLanes = 0b0000000000000000000000000000000
export const NoLane = 0b0000000000000000000000000000000

export function includesSomeLane(a: Lanes |Lane, b: Lanes | Lane) {
  return (a & b) !== NoLanes
}

export function isSubsetOfLanes(set: Lanes, subset: Lanes | Lane) {
  return (set & subset) === subset
}

export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a | b
}

export function removeLanes(set: Lanes, subset: Lanes | Lane): Lanes {
  return set & ~subset
}

export function intersectLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a & b
}

export function laneToLanes(lane: Lane): Lanes {
  return lane
}

export function higherPriorityLane(a: Lane, b: Lane) {
  return a !== NoLane && a < b ? a : b
}
