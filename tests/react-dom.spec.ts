import { createRoot } from 'react-dom/index'
import { it, expect, describe } from 'vitest'

describe('createRoot', () => {
  it('return has render method', () => {
    const root = document.createElement('div')
    root.innerHTML = `<p>HelloWorld</p>`

    expect(typeof createRoot(root).render).toBe('function')
  })
})