export enum Flags {
  NoFlags = 0b00000000000000000000000000,
  // 新增/插入
  Placement = 0b00000000000000000000000010,
  // 节点更新属性
  Update = 0b00000000000000000000000100,
  // 删除节点
  Deletion = 0b00000000000000000000001000
}