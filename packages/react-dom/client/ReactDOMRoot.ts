import { createContainer, updateContainer } from 'react-reconciler/ReactFiberReconciler'
import type { FiberRoot } from 'react-reconciler/ReactInternalTypes'
import type { ReactNodeList } from 'shared/ReactTypes'
import { ConcurrentRoot } from '../../react-reconciler/ReactRootTags'

export interface RootType {
  render(children: ReactNodeList): void
  unmount(): void
  _internalRoot: FiberRoot
}

export function createRoot(
  container: Element | Document | DocumentFragment,
): RootType {
  const root = createContainer(container, ConcurrentRoot)
  // TODO

  return new ReactDOMRoot(root)
}

class ReactDOMRoot {
  constructor(public _internalRoot: FiberRoot) {}

  render(children: ReactNodeList) {
    const root = this._internalRoot
    updateContainer(children, root)
  }

  unmount() {}
}
