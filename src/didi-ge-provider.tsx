import type { DiDiGeState } from 'src/index.d'
import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createDidiGeState } from './create-didi-ge'

export const createDidiGeContext = <T extends unknown>(
  initDidiGe: DiDiGeState<T>,
) => {
  const CTX = createContext<DiDiGeState<T>>(initDidiGe)

  const DidigeProvider = ({
    initialState,
    children,
  }: {
    children: React.ReactNode
    initialState: T
  }) => {
    const ref = useRef<DiDiGeState<T>>()
    if (!ref.current) {
      ref.current = createDidiGeState(initialState)
    }

    return (
      <CTX.Provider value={ref.current}>
        {children}
      </CTX.Provider>
    )
  }
  const useStoreSelector = <T,>(
    store: DiDiGeState<T>,
    selector: (state: T) => Partial<T>,
  ) => {
    const [state, setState] = useState(
      selector(store.get()),
    )
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(selector(store.get()))
      })
      /**
       * “It invokes the setState() function once in useEffect. This is due to the fact that useEffect is delayed and there's a chance that store already has a new state.”。
       */
      setState(selector(store.get()))
      return unsubscribe
    }, [store])

    return [state, store.set] as const
  }

  return [DidigeProvider, useStoreSelector]
}
