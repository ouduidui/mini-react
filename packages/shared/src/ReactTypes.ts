export type ElementType = any

export type Key = string | null

export type Ref = any

export interface Props {
  [key: string]: any
  children?: ReactElement
}

export interface ReactElement {
  $$typeof: symbol
  type: ElementType
  key: Key
  props: Props
  ref: Ref
}
