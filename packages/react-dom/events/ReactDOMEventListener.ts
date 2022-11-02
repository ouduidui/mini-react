import { ContinuousEventPriority, DefaultEventPriority, DiscreteEventPriority } from 'react-reconciler/ReactEventPriorities'
import type { Lane } from 'react-reconciler/ReactFiberLane'
import type { DOMEventName } from './DOMEventNames'

export const getEventPriority = (domEventName: DOMEventName): Lane => {
  switch (domEventName) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    // Used by polyfills:
    // eslint-disable-next-line no-fallthrough
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    // Only enableCreateEventHandleAPI:
    // eslint-disable-next-line no-fallthrough
    case 'beforeblur':
    case 'afterblur':
    // Not used by React but could be by user code:
    // eslint-disable-next-line no-fallthrough
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return DiscreteEventPriority
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    // Not used by React but could be by user code:
    // eslint-disable-next-line no-fallthrough
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return ContinuousEventPriority
    case 'message':
      throw new Error('Not Implement')
    default:
      return DefaultEventPriority
  }
}
