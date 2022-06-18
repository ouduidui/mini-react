import { ReactNodeList } from "shared/ReactType";
import { FiberRoot } from "./ReactInternalTypes";

export const updateContainer = (
  element: ReactNodeList,
  container: FiberRoot
) => {
  const { containerInfo } = container;
  const fiber = createFiber(
    element, {
    type: container.nodeName.toLocaleLowerCase(),
    statNode: containerInfo
  }
  )
}