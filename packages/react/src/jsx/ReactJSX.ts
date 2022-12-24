import { REACT_ELEMENT_TYPE } from 'shared/index'
import type { ElementType, Key, Props, ReactElement, Ref } from 'shared/index'

const hasValidKey = (config: any) => config.key !== undefined

const hasValidRef = (config: any) => config.ref !== undefined

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null
  const props: Props = {}
  let ref: Ref = null

  for (const prop in config) {
    const val = config[prop]
    if (prop === 'key') {
      if (hasValidKey(config)) key = `${val}`
      continue
    }
    if (prop === 'ref' && val !== undefined) {
      if (hasValidRef(config)) ref = val
      continue
    }
    if (Object.prototype.hasOwnProperty.call(config, prop))
      props[prop] = val
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  } as ReactElement
}
