# useSignal

A lightweight React hook for smooth and deferred state updates using React’s `useTransition` and `useDeferredValue`.

## Installation

```bash
npm install react-signal-hook
# or
yarn add your-package-name
```

## Import

```tsx
import useSignal from "your-package-name";
```

## API

```ts
useSignal<S>(
  initialState: S | (() => S),
  options?: {
    smoothState?: boolean;   // default: false
    noTransition?: boolean;  // default: false
  }
): [
  currentState: S,
  setState: Dispatch<SetStateAction<S>>
]
```

- **initialState**: A value or function for the initial state.
- **options.smoothState**: If `true`, returns immediate state instead of deferred state.
- **options.noTransition**: If `true`, skips React's transition mechanism on updates.

## Features

- **Deferred updates**: Smooth UI responsiveness using `useDeferredValue`.
- **Transition control**: Batch updates inside React transitions with `useTransition`.
- **Flexible behavior**: Toggle smooth or immediate updates via options.

## Examples

### Basic usage

```tsx
function Counter() {
  const [count, setCount] = useSignal(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### Immediate state (no defer)

```tsx
function FastCounter() {
  // Returns `state` immediately, without deferring
  const [count, setCount] = useSignal(0, { smoothState: true });

  return (
    <button onClick={() => setCount(100)}>
      Jump to 100: {count}
    </button>
  );
}
```

### Disable transition

```tsx
function NoTransitionCounter() {
  // Updates happen immediately, bypassing transitions
  const [count, setCount] = useSignal(0, { noTransition: true });

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Instant Count: {count}
    </button>
  );
}
```

## License

MIT © RYN BSD
