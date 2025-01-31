import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useDebugValue,
  useDeferredValue,
  useState,
  useTransition,
} from "react";

export type ChangeState<S> = Dispatch<SetStateAction<S>>;

export type Options = {
  /**
   * If true, the state updates immediately without deferring.
   */
  smoothState?: boolean;

  /**
   * If true, state updates will bypass React's transition mechanism.
   */
  noTransition?: boolean;
};

/**
 * @template S - The type of the state value.
 * 
 * @param {S | (() => S)} initialState - The initial state or a function returning the initial state.
 * @param {Options} [options] - Configuration options for the state behavior.
 * @param {boolean} [options.smoothState=false] - Whether to return the state without deferring. @default false
 * @param {boolean} [options.noTransition=false] - Whether to disable React's transition handling. @default false
 * 
 * @returns {[S, ChangeState<S>]} - The current state and a function to update it.
 */
export default function useSignal<S>(
  initialState: S | (() => S),
  { smoothState = false, noTransition = false }: Options = {}
): [S, ChangeState<S>] {
  const [isPending, startTransition] = useTransition();
  useDebugValue(isPending);

  const [state, setState] = useState<S>(initialState);
  useDebugValue(state);

  const deferredState = useDeferredValue<S>(state);
  useDebugValue(deferredState);

  const changeState = useCallback<ChangeState<S>>((newState) => {
    startTransition(() => {
      setState(newState);
    });
  }, []);

  return [
    smoothState ? state : deferredState,
    noTransition ? setState : changeState,
  ];
}
