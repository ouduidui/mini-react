import type { FiberNode } from './ReactFiber'
import { NoFlags } from './ReactFiberFlags'
import type { Instance } from './ReactFiberHostConfig'
import { appendInitialChild, createInstance } from './ReactFiberHostConfig'
import { WorkTag } from './ReactWorkTags'

export const completeWork = (workInProgress: FiberNode) => {
  switch (workInProgress.tag) {
    case WorkTag.HostRoot:
      bubbleProperties(workInProgress)
      return null
    case WorkTag.HostComponent:
      workInProgress.stateNode = createInstance(workInProgress.type)
      appendAllChildren(workInProgress.stateNode, workInProgress)

      bubbleProperties(workInProgress)
      return null
    default:
      return null
  }
}

function bubbleProperties(completeWork: FiberNode) {
  let subtreeFlags = NoFlags
  let child = completeWork.child
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags
    subtreeFlags |= child.flags

    child.return = completeWork
    child = child.sibling
  }
  completeWork.subtreeFlags |= subtreeFlags
}

function appendAllChildren(parent: Instance, workInProgress: FiberNode) {
  // 遍历workInProgress所有子孙 DOM元素，依次挂载
  let node = workInProgress.child
  while (node) {
    if (node.tag === WorkTag.HostComponent) {
      appendInitialChild(parent, node.stateNode)
    }
    else if (node.child) {
      node.child.return = node
      node = node.child
      continue
    }

    if (node === workInProgress)
      return

    while (node.sibling) {
      if (!node.return || node.return === workInProgress)
        return

      node = node.return
    }

    node.sibling!.return = node.return
    node = node.sibling
  }
}
