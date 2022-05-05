export type EmptyCallback = () => void

export type Identity<T> = (input: T) => T

export type DiDiGeState<T> = {
  get: () => T
  set: (update: T | Identity<T>) => void
  subscribe: (cb: EmptyCallback) => EmptyCallback
}
