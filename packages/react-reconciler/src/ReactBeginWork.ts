import type { ReactElement } from 'shared/dist'
import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber'
import type { FiberNode } from './ReactFiber'
import { WorkTag } from './ReactWorkTags'

export const beginWork = (workInProgress: FiberNode) => {
  switch (workInProgress.tag) {
    case WorkTag.HostRoot:
      return updateHostRoot(workInProgress)
    default :
      return null
  }
}

function updateHostRoot(workInProgress: FiberNode) {
  const nextProps = workInProgress.pendingProps
  const nextChildren = nextProps.children
  reconcileChildren(workInProgress, nextChildren)
  return workInProgress.child
}

function reconcileChildren(workInProgress: FiberNode, children?: ReactElement) {
  const current = workInProgress.alternate

  // update
  if (current)
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, children)

  // mount
  else
    workInProgress.child = mountChildFibers(workInProgress, null, children)
}
