import type { ReactElement } from 'shared/index'
import { REACT_ELEMENT_TYPE } from 'shared/index'
import type { FiberNode } from './ReactFiber'
import { createFiberFromElement } from './ReactFiber'
import { Placement } from './ReactFiberFlags'

function createChildReconciler(shouldTrackEffect: boolean) {
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFirstChild: FiberNode | null,
    newChild: ReactElement,
  ) {
    const fiber = createFiberFromElement(newChild)
    fiber.return = returnFiber
    return fiber
  }

  function placeSingleChild(fiber: FiberNode) {
    if (shouldTrackEffect)
      fiber.flags |= Placement

    return fiber
  }

  function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFirstChild: FiberNode | null,
    newChild?: ReactElement,
  ) {
    if (typeof newChild === 'object' && newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstChild, newChild),
          )
        default:
          return null
      }
    }
    return null
  }

  return reconcileChildFibers
}

export const reconcileChildFibers = createChildReconciler(true)
export const mountChildFibers = createChildReconciler(false)
