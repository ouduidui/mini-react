export const TotalLanes = 31

export type Lanes = number
export type Lane = number
export type LaneMap<T> = Array<T>

export const NoLanes: Lanes = 0b0000000000000000000000000000000
export const NoLane: Lane = 0b0000000000000000000000000000000

export const SyncLane: Lane = 0b0000000000000000000000000000001
export const InputContinuousLane: Lanes = 0b0000000000000000000000000000100
export const DefaultLane: Lanes = 0b0000000000000000000000000010000

export const IdleLane: Lanes = 0b0100000000000000000000000000000

export const NoTimestamp = -1

export function createLaneMap<T>(initial: T): LaneMap<T> {
  const laneMap: LaneMap<T> = []
  for (let i = 0; i < TotalLanes; i++)
    laneMap.push(initial)

  return laneMap
}

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
