
export interface View {
  init: (parent: Element) => Element;
  destruct?: () => void;
}
export type ViewFn<T> = (data: T) => View;
