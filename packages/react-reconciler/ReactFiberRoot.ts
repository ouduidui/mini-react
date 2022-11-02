import { NoLane, NoLanes, NoTimestamp, createLaneMap } from './ReactFiberLane'
import type { FiberRoot } from './ReactInternalTypes'
import type { RootTag } from './ReactRootTags'

class FiberRootNode {
  callbackNode = null
  pendingLanes = NoLanes
  expiredLanes = NoLanes
  finishedWork = null
  current = null as any
  eventTimes = createLaneMap(NoLanes)
  expirationTimes = createLaneMap(NoTimestamp)
  callbackPriority = NoLane

  constructor(public containerInfo: any, public tag: RootTag) {}
}

export function createFiberRoot(
  container: any,
  tag: RootTag,
): FiberRoot {
  const root: FiberRoot = new FiberRootNode(container, tag)

  return root
}
