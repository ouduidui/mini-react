import type { Container } from 'react-dom/ReactDomRoot'
import { createFiberRoot } from './ReactFiberRoot'
import type { FiberRoot } from './ReactInternalTypes'
import type { RootTag } from './ReactRootTags'

export const createContainer = (container: Container, tag: RootTag): FiberRoot =>
  createFiberRoot(container, tag)
