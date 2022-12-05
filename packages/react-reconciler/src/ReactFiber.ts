
import type { ReactElement } from 'shared/index'
import type { Key, Props } from 'shared/index'
import type { UpdateQueue } from './ReactFiberClassUpdateQueue'
import type { Flags } from './ReactFiberFlags'
import { NoFlags } from './ReactFiberFlags'
import type { Container } from './ReactFiberHostConfig'
import { WorkTag } from './ReactWorkTags'

export class FiberNode {
  tag: WorkTag
  key: Key
  type: any
  flags: Flags = NoFlags
  subtreeFlags: Flags = NoFlags
  pendingProps: Props
  memoizedProps: Props | null = null
  stateNode: any = null

  return: FiberNode | null = null
  sibling: FiberNode | null = null
  child: FiberNode | null = null
  alternate: FiberNode | null = null
  index = 0

  updateQueue: UpdateQueue | null = null
  memoizedState: any

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag
    this.key = key
    this.pendingProps = pendingProps
  }
}

export class FiberRootNode {
  constructor(public container: Container, public current: FiberNode) {
    current.stateNode = this
  }
}

export const createWorkInProgress = (current: FiberNode, pendingProps: Props) => {
  let wip = current.alternate

  if (!wip) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key)
    wip.type = current.type
    wip.stateNode = current.stateNode

    wip.alternate = current
    current.alternate = wip
  }
  else {
    // update
    wip.pendingProps = pendingProps
  }

  wip.updateQueue = current.updateQueue
  wip.flags = current.flags
  wip.child = current.child

  // 数据
  wip.memoizedProps = current.memoizedProps
  wip.memoizedState = current.memoizedState

  return wip
}

export function createFiberFromElement(element: ReactElement) {
  const { type, key, props } = element
  let fiberTag = WorkTag.FunctionComponent

  if (typeof type === 'string')
    fiberTag = WorkTag.HostComponent

  const fiber = new FiberNode(fiberTag, props, key)
  fiber.type = type

  return fiber
}
