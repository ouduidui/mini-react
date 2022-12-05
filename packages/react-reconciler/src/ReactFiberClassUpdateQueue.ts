import type { FiberNode } from './ReactFiber'

type UpdateAction = any

export interface Update {
  action: UpdateAction
}

export interface UpdateQueue {
  shared: {
    pending: Update | null
  }
}

/**
 * 创建
 * @param action
 * @returns
 */
export const createUpdate = (action: UpdateAction) => {
  return {
    action,
  }
}

/**
 * 初始化
 * @param fiber
 */
export const initializeUpdateQueue = (fiber: FiberNode) => {
  fiber.updateQueue = {
    shared: {
      pending: null,
    },
  }
}

/**
 * 插入
 * @param fiber
 * @param update
 */
export const enqueueUpdate = (fiber: FiberNode, update: Update) => {
  const updateQueue = fiber.updateQueue
  if (updateQueue)
    updateQueue.shared.pending = update
}
