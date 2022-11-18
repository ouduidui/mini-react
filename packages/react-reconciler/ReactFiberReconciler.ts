import type { Container } from 'react-dom/client/ReactDOMHostConfig'
import type { ReactNodeList } from 'shared/ReactTypes'
import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdate'
import { createFiberRoot } from './ReactFiberRoot'
import { requestEventTime, requestUpdateLane, scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
import type { FiberRoot } from './ReactInternalTypes'
import type { RootTag } from './ReactRootTags'

export function createContainer(container: Container, tag: RootTag) {
  return createFiberRoot(container, tag)
}

export function updateContainer(
  element: ReactNodeList,
  container: FiberRoot,
) {
  const current = container.current
  const eventTime = requestEventTime()
  // 获取该次更新的优先级
  // 如果不处于ConcurrentMode，那么优先级为SyncLane
  const lane = requestUpdateLane(current)

  // 创建一个更新对象
  const update = createUpdate(eventTime, lane)
  update.payload = { element }
  enqueueUpdate(current, update)

  // 调度该filter节点上的更新
  scheduleUpdateOnFiber(current, lane, eventTime)
}
