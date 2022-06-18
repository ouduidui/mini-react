import { updateContainer } from 'react-reconciler/ReactFiberReconciler'
import { FiberRoot } from 'react-reconciler/ReactInternalTypes'
import type { ReactNodeList } from 'shared/ReactType'

interface RootType {
  render: (children: ReactNodeList) => void
}


class ReactDOMRoot {
  constructor(
    private _internalRoot: FiberRoot
  ) { }


  render(children: ReactNodeList) {
    const root = this._internalRoot
    updateContainer(children, root)
  }
}

export const createRoot = (container: Element): RootType => {
  const root = {
    containerInfo: container
  }
  return new ReactDOMRoot(root)
}
