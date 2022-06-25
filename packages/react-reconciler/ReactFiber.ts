import { Flags } from "./ReactFiberFlags";
import { WorkTag } from "./ReactWorkTags"

const createFiber = (
  tag: WorkTag,
  pendingProps: any,
  key: null | string
) => new FiberNode(tag, pendingProps, key)


class FiberNode {
  public type = null  // 节点标签
  public stateNode = null  // 原生组件 -> DOM节点    函数组件/类组件 -> 实例
  public return: FiberNode | null = null;  // 父节点
  public child: FiberNode | null = null;  // 第一个孩子节点
  public sibling: FiberNode | null = null;  // 下一个兄弟节点

  public flag: Flags = Flags.NoFlags
  public index = 0  // 记录节点在当前层级下的位置

  constructor(
    public tag: WorkTag,  // 节点类型
    public pendingProps: any,  // Props属性
    public key: null | string  // key值
  ) { }
}