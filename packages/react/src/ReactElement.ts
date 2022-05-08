import hasOwnProperty from 'shared/hasOwnProperty'
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol'
import type { Key } from 'shared/ReactTypes'

interface ReactElement {
  /**
   * https://overreacted.io/zh-hans/why-do-react-elements-have-typeof-property/
   */
  $$typeof: Symbol
  type: any
  key: Key | null
  props: any
}

/**
 * 保留属性，以下属性不会加入到props中
 */
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}

export function createElement(
  type: any,
  config?: Record<string, any>,
  ...children: any[]
): ReactElement {
  const props: Record<string, any> = {}

  let key: Key | null = null

  if (config) {
    for (const propName in config) {
      if (
        hasOwnProperty.call(config, propName)
        && !hasOwnProperty.call(RESERVED_PROPS, propName)
      )
        props[propName] = config[propName]
    }
  }

  if (type?.defaultProps) {
    const defaultProps = type.defaultProps
    for (const propName in defaultProps) {
      if (props[propName] === undefined)
        props[propName] = defaultProps[propName]
    }
  }

  if (config?.key)
    key = `${config?.key}`

  if (children.length === 1)
    props.children = children[0]
  else if (children.length > 1)
    props.children = children

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    props,
  }
}
