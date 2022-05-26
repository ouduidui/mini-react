import type { Container } from 'react-dom/ReactDomRoot'
import type { FiberRoot } from './ReactInternalTypes'
import type { RootTag } from './ReactRootTags'

class FiberRootNode {
  current = null as any
  constructor(
    public containerInfo: Container,
    public tag: RootTag,
  ) {}
}

/**
 *
 * @param containerInfo
 * @param tag
 * @returns
 */
export const createFiberRoot = (
  containerInfo: Container,
  tag: RootTag,
): FiberRoot => {
  const root: FiberRoot = new FiberRootNode(containerInfo, tag)

  // TODO

  return root
}
