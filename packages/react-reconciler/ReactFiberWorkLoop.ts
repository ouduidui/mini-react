import type { Fiber, FiberRoot } from './ReactInternalTypes'
import { TypeOfMode } from './ReactTypeOfMode'

enum ExecutionContext {
  NoContext = 0b000,
  BatchedContext = 0b001,
  RenderContext = 0b010,
  CommitContext = 0b100,
}

// 当前正在执行的阶段
const executionContext: ExecutionContext = ExecutionContext.NoContext
// 当前正在执行的根节点
const workInProgressRoot: FiberRoot | null = null
// 当前正在执行的节点
const workInProgress: Fiber | null = null

export function isUnsafeClassRenderPhaseUpdate(fiber: Fiber) {
  return (fiber.mode & TypeOfMode.ConcurrentMode) === TypeOfMode.NoMode
}
