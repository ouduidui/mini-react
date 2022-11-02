import { getEventPriority } from 'react-dom/events/ReactDOMEventListener'
import { DefaultEventPriority } from 'react-reconciler/ReactEventPriorities'
import type { Lane } from 'react-reconciler/ReactFiberLane'
import type { FiberRoot } from 'react-reconciler/ReactInternalTypes'

export type Container =
| (Element & { _reactRootContainer?: FiberRoot })
| (Document & { _reactRootContainer?: FiberRoot })
| (DocumentFragment & { _reactRootContainer?: FiberRoot })

export function getCurrentEventPriority(): Lane {
  const currentEvent = window.event
  if (currentEvent === undefined)
    return DefaultEventPriority

  return getEventPriority(currentEvent.type as any)
}
