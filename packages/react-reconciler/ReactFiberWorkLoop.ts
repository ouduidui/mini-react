import { getCurrentEventPriority } from 'react-dom/client/ReactDOMHostConfig'
import { getCurrentUpdatePriority } from './ReactEventPriorities'
import type { Lane } from './ReactFiberLane'
import { NoLane, NoTimestamp, SyncLane } from './ReactFiberLane'
import type { Fiber, FiberRoot } from './ReactInternalTypes'
import { TypeOfMode } from './ReactTypeOfMode'
import { now } from './Scheduler'

enum ExecutionContext {
  NoContext = 0b000,
  BatchedContext = 0b001,
  RenderContext = 0b010,
  CommitContext = 0b100,
}

// 当前正在执行的阶段
const executionContext: ExecutionContext = ExecutionContext.NoContext
// 当前正在执行的根节点
// const workInProgressRoot: FiberRoot | null = null
// 当前正在执行的节点
// const workInProgress: Fiber | null = null

let currentEventTime: number = NoTimestamp

export function isUnsafeClassRenderPhaseUpdate(fiber: Fiber) {
  return (fiber.mode & TypeOfMode.ConcurrentMode) === TypeOfMode.NoMode
}

/**
 * 获取该次事件的开始时间
 */
export function requestEventTime() {
  if ((executionContext & (ExecutionContext.RenderContext | ExecutionContext.CommitContext)) !== ExecutionContext.NoContext) {
    // 在render阶段或commit阶段，直接返回当前时间
    return now()
  }

  if (currentEventTime !== NoTimestamp) {
    // 处于一个浏览器事件中，所有在同一事件的handler中请求的开始时间都是一样的
    return currentEventTime
  }

  // 这时react将控制权交还给浏览器，产生的第一次更新
  currentEventTime = now()
  return currentEventTime
}

/**
 * 根据fiber所处的mode获得该次更新的优先级
 * @param fiber
 */
export function requestUpdateLane(fiber: Fiber) {
  const mode = fiber.mode
  if ((mode & TypeOfMode.ConcurrentMode) === TypeOfMode.NoMode) {
    // 如果不处于concurrent模式，直接返回SyncLane
    return SyncLane
  }
  else if ((executionContext & ExecutionContext.RenderContext) !== ExecutionContext.NoContext) {
    throw new Error('Not Implement')
  }

  const updateLane: Lane = getCurrentUpdatePriority()
  if (updateLane !== NoLane)
    return updateLane

  const eventLane: Lane = getCurrentEventPriority()
  return eventLane
}
