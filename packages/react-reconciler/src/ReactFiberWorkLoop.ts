import { beginWork } from './ReactBeginWork'
import { completeWork } from './ReactCompleteWork'
import type { FiberNode, FiberRootNode } from './ReactFiber'
import { createWorkInProgress } from './ReactFiber'
import { WorkTag } from './ReactWorkTags'

let workInProgress: FiberNode | null = null

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  const root = markUpdateLaneFromFiberToRoot(fiber)
  if (!root)
    return

  ensureRootIsScheduled(root)
}

function markUpdateLaneFromFiberToRoot(fiber: FiberNode) {
  let node = fiber
  let parent = node.return
  while (parent !== null) {
    node = parent
    parent = node.return
  }

  if (node.tag === WorkTag.HostRoot)
    return node.stateNode

  return null
}

function ensureRootIsScheduled(root: FiberRootNode) {
  performSyncWorkOnRoot(root)
}

function performSyncWorkOnRoot(root: FiberRootNode) {
  // 初始化操作
  prepareFreshStack(root)

  // render阶段具体操作
  do {
    try {
      workLoop()
      break
    }
    catch (e) {
      workInProgress = null
    }
  } while (true)
}

function prepareFreshStack(root: FiberRootNode) {
  workInProgress = createWorkInProgress(root.current, {})
}

function workLoop() {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (workInProgress)
    performUnitOfWork(workInProgress)
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)

  if (!next)
    completeUnitOfWork(fiber)
  else
    workInProgress = next
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber

  do {
    const next = completeWork(node)

    if (next) {
      workInProgress = next
      return
    }
    const sibling = node.sibling
    if (sibling) {
      workInProgress = next
      return
    }
    node = node.return
    workInProgress = node
  } while (node)
}
