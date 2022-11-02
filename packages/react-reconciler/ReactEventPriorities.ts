import type { Lane } from './ReactFiberLane'
import { DefaultLane, IdleLane, InputContinuousLane, NoLane, SyncLane } from './ReactFiberLane'

export type EventPriority = Lane

export const DiscreteEventPriority: EventPriority = SyncLane
export const DefaultEventPriority: EventPriority = DefaultLane
export const ContinuousEventPriority: EventPriority = InputContinuousLane
export const IdleEventPriority: EventPriority = IdleLane

const currentUpdatePriority: EventPriority = NoLane

/**
 * 当前更新的优先级
 * @returns
 */
export function getCurrentUpdatePriority() {
  return currentUpdatePriority
}
