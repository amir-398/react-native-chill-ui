// Main components (Hybrid - auto-detect)
export { default as MaskedInput } from './components/MaskedInput';

// Tailwind components
export { MaskedInputTw } from './components/MaskedInput.tw';

// StyleSheet components
export { MaskedInputSs } from './components/MaskedInput.ss';

// Utility functions (shared across all variants)
export { applyMask, removeMask, handleApplyMask } from './utils/maskUtils';

// Types
export type { MaskedInputPropsTw } from '@types/maskedInput';

export type { MaskedInputPropsSs } from '@types/maskedInput';
