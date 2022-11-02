export type RootTag = typeof LegacyRoot | typeof ConcurrentRoot

// 通过React.render()创建的根节点的标记
export const LegacyRoot = 0
// 通过React.createRoot()创建的根节点的标记
export const ConcurrentRoot = 1
