import type { ReactElement } from 'shared/dist'
import { FiberNode, FiberRootNode } from './ReactFiber'
import { createUpdate, enqueueUpdate, initializeUpdateQueue } from './ReactFiberClassUpdateQueue'
import type { Container } from './ReactFiberHostConfig'
import { WorkTag } from './ReactWorkTags'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'

export function createContainer(container: Container) {
  const hostRootFiber = new FiberNode(WorkTag.HostRoot, {}, null)
  const root = new FiberRootNode(container, hostRootFiber)
  initializeUpdateQueue(hostRootFiber)
  return root
}

export function updateContainer(element: ReactElement, root: FiberRootNode) {
  const hostRootFiber = root.current
  const update = createUpdate(element)
  enqueueUpdate(hostRootFiber, update)
  scheduleUpdateOnFiber(hostRootFiber)
}
