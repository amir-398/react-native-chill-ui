import { createContext, useContext } from 'react';

/**
 * Context interface for SegmentedControl state values that change frequently.
 * These values trigger re-renders when they change.
 */
interface SegmentedControlStateContextProps {
  itemWidth: number;
  selectedOption: string;
  validItemsValues: string[];
  indicatorChildren: React.ReactNode;
}

/**
 * Context interface for SegmentedControl action functions that never change.
 * These functions are stable and don't trigger re-renders.
 */
interface SegmentedControlActionsContextProps {
  setItemWidth: (width: number) => void;
  setSelectedOption: (option: string) => void;
  setValidItemsValues: (values: string[]) => void;
}

export const SegmentedControlStateContext = createContext<SegmentedControlStateContextProps>({
  indicatorChildren: null,
  itemWidth: 0,
  selectedOption: '',
  validItemsValues: [],
});

export const SegmentedControlActionsContext = createContext<SegmentedControlActionsContextProps>({
  setItemWidth: () => {},
  setSelectedOption: () => {},
  setValidItemsValues: () => {},
});

/**
 * Hook to access SegmentedControl state values.
 * Only re-renders when state values change, not when actions are called.
 * Use this hook in components that need to read the current state.
 *
 * @returns Object containing current state values: itemWidth, selectedOption, validItemsValues, indicatorChildren
 * @throws Error if used outside of SegmentedControlProvider
 *
 * @example
 * ```tsx
 * const { selectedOption, itemWidth } = useSegmentedControlState();
 * ```
 */
export const useSegmentedControlState = () => {
  const context = useContext(SegmentedControlStateContext);
  if (!context) {
    throw new Error('useSegmentedControlState must be used within a SegmentedControlProvider');
  }
  return context;
};

/**
 * Hook to access SegmentedControl action functions.
 * These functions are stable and never change, so components using only this hook won't re-render.
 * Use this hook in components that need to update the state.
 *
 * @returns Object containing action functions: setItemWidth, setSelectedOption, setValidItemsValues
 * @throws Error if used outside of SegmentedControlProvider
 *
 * @example
 * ```tsx
 * const { setSelectedOption } = useSegmentedControlActions();
 * ```
 */
export const useSegmentedControlActions = () => {
  const context = useContext(SegmentedControlActionsContext);
  if (!context) {
    throw new Error('useSegmentedControlActions must be used within a SegmentedControlProvider');
  }
  return context;
};

/**
 * Hook to access both SegmentedControl state and actions.
 * Combines state and actions into a single object for convenience.
 * Use this hook when you need both reading and writing capabilities.
 *
 * @returns Object containing both state values and action functions
 * @throws Error if used outside of SegmentedControlProvider
 *
 * @example
 * ```tsx
 * const { selectedOption, setSelectedOption } = useSegmentedControlContext();
 * ```
 */
export const useSegmentedControlContext = () => {
  const state = useSegmentedControlState();
  const actions = useSegmentedControlActions();
  return { ...state, ...actions };
};
