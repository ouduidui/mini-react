import { expect, it } from 'vitest'
import { createContainer } from '../index'

it('should work', () => {
  expect(1 + 1).toBe(2)
})

it('should create a container', () => {
  const dom = document.createElement('div')
  const child = document.createElement('span')
  child.textContent = 'Hello World'
  dom.appendChild(child)

  const container = createContainer(dom)

  expect(container.container).toBe(dom)
  // expect(container.current).not.toBe(null);
  // expect(container).toMatchInlineSnapshot(`
  //   FiberRootNode {
  //     "container": <div>
  //       <span>
  //         Hello World
  //       </span>
  //     </div>,
  //     "current": FiberNode {
  //       "alternate": null,
  //       "child": null,
  //       "flags": 0,
  //       "index": 0,
  //       "key": null,
  //       "memoizedProps": null,
  //       "pendingProps": {},
  //       "return": null,
  //       "sibling": null,
  //       "stateNode": [Circular],
  //       "subtreeFlags": 0,
  //       "tag": 3,
  //       "updateQueue": {
  //         "shared": {
  //           "pending": null,
  //         },
  //       },
  //     },
  //   }
  // `)
})
