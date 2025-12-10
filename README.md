# @dubisdev/crtm-api

A type-safe, lightweight API client for CRTM (Consorcio Regional de Transportes de Madrid) public transport data.

## Features

- 🚀 **Lightweight** - Minimal dependencies, tree-shakeable
- 🔒 **Type-safe** - Full TypeScript support with runtime validation
- 🎯 **Simple API** - Clean, intuitive interface
- 📦 **Modular** - Import only what you need
- ✅ **Tested** - Comprehensive test coverage

## Installation

```bash
npm install @dubisdev/crtm-api
```

## Quick Start

```typescript
import { getStopByCode, getLineByCode, getStopTimesByStopCode } from '@dubisdev/crtm-api';

// Get stop information
const stop = await getStopByCode('8_21044');

// Get line information
const line = await getLineByCode('123');

// Get stop times
const times = await getStopTimesByStopCode('8_21044');
```

## Error Handling

```typescript
import { NotFoundError, NetworkError } from '@dubisdev/crtm-api';

try {
  const stop = await getStopByCode('INVALID_CODE');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error('Resource not found');
  } else if (error instanceof NetworkError) {
    console.error('Network error occurred');
  }
}
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage

# Build
bun run build
```

## License

MIT © [David Jiménez](https://github.com/dubisdev)
