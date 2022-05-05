import {
  DiDiGeState,
  EmptyCallback,
  Identity,
} from './index.d'

export const createDidiGeState = <T extends unknown>(
  didige: T,
): DiDiGeState<T> => {
  const callbacks = new Set<EmptyCallback>()
  return {
    get() {
      return didige
    },
    set(next) {
      didige =
        typeof next === 'function'
          ? (next as Identity<T>)(didige)
          : next
    },
    subscribe(cb) {
      callbacks.add(cb)
      return () => callbacks.delete(cb)
    },
  }
}
