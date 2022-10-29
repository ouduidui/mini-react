import { RefObject } from "shared/ReactTypes";
import { Flags } from "./ReactFiberFlags";
import { Lanes } from "./ReactFiberLane";
import { TypeOfMode } from "./ReactTypeOfMode";
import { WorkTag } from "./ReactWorkTags";

export type FiberRoot  = any

export type Fiber = {
  // 组件类型
  tag: WorkTag,

  // 当前层级的唯一标识符
  key: null | string,

  // 节点类型
  elementType: any,
  type: any,

  // 本地状态
  // 静态节点 -> Dom
	// class组件 -> 实例
  stateNode: any,

  // Fiber树的父节点
  return: Fiber | null,
  // Fiber树的子节点
  child: Fiber | null,
  // Fiber树的下一个兄弟节点
  sibling: Fiber | null,
  // 标记当前节点的层级的位置
  index: number,

  // ref对象
  ref: | null
    | (((handle: unknown) => void)) & ({_stringRef?: string})
    | RefObject,

  // 未更新的props
  pendingProps: any,
  // 更新完的props
  memoizedProps: any,

  // 更新队列
  updateQueue: unknown

  // 响应式state
  // class -> state对象
	// function -> fiber的第一个hook
  memoizedState: any

  // 模式
  mode: TypeOfMode,

  // Effect
  // 副作用标签
  flags: Flags,
  // 删除的子节点
  deletions: Array<Fiber> | null,

  // 用于判断优先级
  lanes: Lanes

  // 缓存的旧节点
  alternate: Fiber | null
}