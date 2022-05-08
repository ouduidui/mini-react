import { describe, expect, it } from 'vitest'
import { createElement } from '../src/ReactElement'

describe('createElement', () => {
  it('should create a ReactElement', () => {
    expect(createElement('div')).toMatchSnapshot()
  })

  it('has props', () => {
    const elm = createElement('div', { className: 'm-10', id: 'divEl', key: 123 })
    expect(elm).toMatchSnapshot()
    expect(elm.key).toBe('123')
  })
})
