# react-use-signal 🔄

A performant React hook for managing state transitions and deferred updates with surgical control.

Signals are renowned for their efficiency in performance-critical applications, enabling precise, minimal re-renders by targeting only specific components. This level of optimization has traditionally been unattainable within React's existing architecture. However, today marks a turning point—now, using only built-in React hooks, you can achieve unprecedented render minimization, significantly enhancing application performance.

## Table of Contents 📑

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Examples](#-examples)
- [Comparison with useState](#-comparison-with-usestate)
- [API Reference](#-api-reference)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Features

- Automatic transition management
- Configurable deferred value strategy
- Zero-dependency implementation
- TypeScript first-class support
- React 18+ optimized
- DevTools integration

## 📦 Installation

```bash
npm install react-use-signal
# or
yarn add react-use-signal
# or
pnpm add react-use-signal
# or
bun add react-use-signal
```

## 🚀 Usage

### Basic Example

```tsx
import useSignal from "react-use-signal";

function App() {
  const [text, setText] = useSignal("");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />
      <Results query={text} />
    </div>
  );
}
```

### Advanced Configuration

```tsx
const [value, setValue] = useSignal(initialValue, {
  smoothState: true, // Disable deferred value
  noTransition: true, // Disable transition wrapping
});
```

## 📚 Examples

### Search Input with Debouncing

```tsx
function SearchBox() {
  const [query, setQuery] = useSignal("");

  const results = useMemo(() => searchAPI(deferredQuery), [deferredQuery]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults results={results} />
    </div>
  );
}
```

### Animation Frame Control

```tsx
function AnimatedComponent() {
  const [position, setPosition] = useSignal(0);

  useFrame(() => {
    setPosition((p) => p + 1);
  });

  return <div style={{ transform: `translateX(${position}px)` }} />;
}
```

## ⚖️ Comparison with useState

### Code Complexity

|                     | useState | useSignal |
| ------------------- | -------- | --------- |
| Lines of Code       | 8        | 1         |
| Transition Handling | Manual   | Automatic |
| Deferred Values     | Manual   | Built-in  |
| Update Strategies   | 1        | 4         |

### Performance Characteristics

| Metric               | useState | useSignal |
| -------------------- | -------- | --------- |
| Render Cycles        | Higher   | Optimized |
| Input Responsiveness | Good     | Better    |
| Jank Potential       | Medium   | Low       |

### When to Choose

| Use Case               | useState         | useSignal      |
| ---------------------- | ---------------- | -------------- |
| Simple state           | ✅               | ⚠️ Overkill    |
| Complex transitions    | ⚠️ Manual        | ✅ Ideal       |
| High-frequency updates | ⚠️ Possible jank | ✅ Smooth      |
| Search/Filter UIs      | ⚠️ Possible lag  | ✅ Recommended |

## 📖 API Reference

### `useSignal(initialState, options?)`

```ts
type Options = {
  /**
   * Bypass deferred value for immediate updates
   * @default false
   */
  smoothState?: boolean;

  /**
   * Disable React transition wrapping
   * @default false
   */
  noTransition?: boolean;
};
```

### Return Value

Same as useState.

```ts
type ReturnType<S> = [state: S, setState: Dispatch<SetStateAction<S>>];
```

### Configuration Modes

| Mode              | smoothState | noTransition | Use Case                                     |
| ----------------- | ----------- | ------------ | -------------------------------------------- |
| Default           | false       | false        | Optimized updates with transitions           |
| Immediate Updates | true        | true         | Critical state that needs instant reflection |
| Transition Only   | true        | false        | Batched updates without deferring            |
| Deferred Only     | false       | true         | Late value without transition API            |

## 🏎️ Performance

### Optimization Strategies

1. **Debounced Updates**: Automatic transition wrapping prevents UI blocking
2. **Deferred Rendering**: Non-urgent updates don't block main thread
3. **Memoization Ready**: Stable references for dependency arrays

## 📄 License

MIT © [RB](https://github.com/RYNBSD)

---

**Looking for maintainers!** Help us improve this project - reach out if interested in maintaining.
