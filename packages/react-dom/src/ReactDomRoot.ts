import type { Container } from 'react-reconciler'
import { createContainer, updateContainer } from 'react-reconciler'
import type { ReactElement } from 'shared/index'

export function createRoot(container: Container) {
  const root = createContainer(container)
  return {
    render(element: ReactElement) {
      updateContainer(element, root)
    },
  }
}
