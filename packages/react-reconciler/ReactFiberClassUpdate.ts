import type { Lane } from './ReactFiberLane'
import { isUnsafeClassRenderPhaseUpdate } from './ReactFiberWorkLoop'
import type { Fiber } from './ReactInternalTypes'

export interface Update<State> {
  eventTime: number
  lane: Lane

  tag: 0 | 1 | 2 | 3
  payload: any
  callback: (() => unknown) | null

  next: Update<State> | null
}

export interface SharedQueue<State> {
  pending: Update<State> | null
  lane: Lane
}

export const UpdateState = 0
export const ReplaceState = 1
export const ForceUpdate = 2
export const CaptureUpdate = 3

// 创建一个更新对象
export function createUpdate(eventTime: number, lane: Lane): Update<unknown> {
  const update: Update<unknown> = {
    eventTime,
    lane,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  }

  return update
}

// 将更新对象放入队列中
export function enqueueUpdate<State>(
  fiber: Fiber,
  update: Update<State>,
  lane: Lane,
) {
  const updateQueue = fiber.updateQueue

  // 只会在fiber卸载的时候发生
  if (updateQueue === null)
    return null

  const sharedQueue: SharedQueue<State> = (updateQueue as any).shared

  if (isUnsafeClassRenderPhaseUpdate(fiber)) {
    const pending = sharedQueue.pending
    if (pending === null) {
    // 第一次更新
      update.next = update
    }
    else {
      update.next = pending.next
      pending.next = update
    }
    sharedQueue.pending = update
  }
  else {
    // TODO
  }
}
