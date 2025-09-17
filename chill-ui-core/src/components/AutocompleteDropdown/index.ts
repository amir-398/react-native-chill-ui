/**
 * AutocompleteDropdown provides a smart dropdown with search functionality and auto-completion features.
 * Supports custom rendering, positioning, and advanced search capabilities.
 *
 * @example
 * ```tsx
 * <AutocompleteDropdown
 *   dataSet={data}
 *   valueField="name"
 *   searchField="name"
 *   onSelectItem={(item) => console.log('Selected:', item)}
 *   inputProps={{
 *     placeholder: 'Search...',
 *   }}
 * />
 * ```
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/AutocompleteDropdown/README.md Documentation}
 */
export { default as AutocompleteDropdown } from './AutocompleteDropdown';
export * from './types';
export { AutocompleteDropdownContext } from './context/AutoCompleteDropdownContext';
