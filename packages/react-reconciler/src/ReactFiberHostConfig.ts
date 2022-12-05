export type Container = Element | Document
export type Instance = Element

export const createInstance = (type: string) => document.createElement(type)

export const appendInitialChild = (parent: Instance, child: Instance) => {
  parent.appendChild(child)
}
