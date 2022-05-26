import { createContainer } from './../../react-reconciler/src/ReactFiberReconciler'
import type { FiberRoot } from './../../react-reconciler/src/ReactInternalTypes'
import type { RootTag } from './../../react-reconciler/src/ReactRootTags'
import { ConcurrentRoot } from './../../react-reconciler/src/ReactRootTags'
export type Container = Element | Document

const createRootImpl = (container: Container, tag: RootTag): FiberRoot => {
  const root = createContainer(container, tag)

  return root
}

/**
 * createRoot创建节点时使用的类（ConcurrentRoot）
 */
class ReactDomRoot {
  _internalRoot: FiberRoot

  constructor(container: Container) {
    this._internalRoot = createRootImpl(container, ConcurrentRoot)
  }
}

export const createRoot = (container: Container) =>
  new ReactDomRoot(container)
