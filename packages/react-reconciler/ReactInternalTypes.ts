import type { RefObject } from 'shared/ReactTypes'
import type { RootTag } from './ReactRootTags'
import type { Flags } from './ReactFiberFlags'
import type { Lane, LaneMap, Lanes } from './ReactFiberLane'
import type { TypeOfMode } from './ReactTypeOfMode'
import type { WorkTag } from './ReactWorkTags'

export interface FiberRoot {
  // 当前完成render阶段构成完成的workInProgress树根节点
  finishedWork: Fiber | null
  // 当前页面所对应的fiber树，其alternate属性指向workInProgress fiber树
  current: Fiber
  // 当前应用所挂载在的dom节点
  // - 在legacy模式中为ReactDom.render方法的第二个参数
  // - 在concurrent模式中为createRoot的参数
  containerInfo: any

  // Scheduler.scheduleCallback的返回值，代表了下次执行render的task
  callbackNode: unknown
  callbackPriority: Lane

  pendingLanes: Lanes
  expiredLanes: Lanes
  expirationTimes: LaneMap<number>
  eventTimes: LaneMap<number>

  // root的类型
  tag: RootTag
}

export interface Fiber {
  // 组件类型
  tag: WorkTag

  // 当前层级的唯一标识符
  key: null | string

  // 节点类型
  elementType: any
  type: any

  // 本地状态
  // 静态节点 -> Dom
  // class组件 -> 实例
  stateNode: any

  // Fiber树的父节点
  return: Fiber | null
  // Fiber树的子节点
  child: Fiber | null
  // Fiber树的下一个兄弟节点
  sibling: Fiber | null
  // 标记当前节点的层级的位置
  index: number

  // ref对象
  ref: | null
  | (((handle: unknown) => void)) & ({ _stringRef?: string })
  | RefObject

  // 未更新的props
  pendingProps: any
  // 更新完的props
  memoizedProps: any

  // 更新队列
  updateQueue: unknown

  // 响应式state
  // class -> state对象
  // function -> fiber的第一个hook
  memoizedState: any

  // 模式
  mode: TypeOfMode

  // Effect
  // 副作用标签
  flags: Flags
  // 删除的子节点
  deletions: Array<Fiber> | null

  // 用于判断优先级
  lanes: Lanes

  // 缓存的旧节点
  alternate: Fiber | null
}
