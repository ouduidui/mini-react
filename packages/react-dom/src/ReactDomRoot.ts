import type { Container } from 'react-reconciler'
import { createContainer, updateContainer } from 'react-reconciler'
import type { ReactElement } from 'shared/index'

/**
 * 创建根节点
 * @param container
 * @returns
 */
export function createRoot(container: Container) {
  const root = createContainer(container)
  return {
    render(element: ReactElement) {
      // 更新根节点
      updateContainer(element, root)
    },
  }
}
