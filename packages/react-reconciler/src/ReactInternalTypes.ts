import type { RootTag } from './ReactRootTags'

export interface FiberRoot {
  current: Fiber

  // root的类型(legacy, batched,concurrent等)
  tag: RootTag
}

export interface Fiber {}
