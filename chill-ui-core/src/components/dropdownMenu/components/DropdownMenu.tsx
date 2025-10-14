import { PropsWithChildren } from 'react';
import { DropdownMenuPropsTw } from '@types';

import useDropdownMenu from '../hooks/useDropdownMenu';
import { DropdownMenuProvider } from './DropdownMenuContext';

/**
 * Root DropdownMenu component that provides context for all dropdown sub-components.
 * Must wrap all dropdown-related components.
 * Automatically manages dropdown state and provides context for all sub-components.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Uncontrolled mode
 * <DropdownMenu>
 *   <DropdownMenuTrigger>
 *     <Button title="Open Menu" />
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * // Controlled mode
 * <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
 *   <DropdownMenuTrigger>
 *     <Button title="Open Menu" />
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @param children - Dropdown content and triggers
 * @param defaultOpen - Initial open state (uncontrolled mode)
 * @param open - Controlled open state
 * @param onOpen - Callback when dropdown opens
 * @param onClose - Callback when dropdown closes
 * @param onOpenChange - Callback when open state changes
 * @returns Dropdown context provider component
 */
export default function DropdownMenu(props: PropsWithChildren<DropdownMenuPropsTw>) {
  const { children, defaultOpen = false, onClose, onOpen, onOpenChange, open } = props;

  const {
    calculatePosition,
    dropdownRef,
    dropdownStyles,
    eventClose,
    eventOpen,
    handleSelectItem,
    inputRef,
    keyboardHeight,
    setDropdownPosition,
    setDropdownWidth,
    setOffsets,
    toggleDropdown,
    visible,
    wrapperRef,
  } = useDropdownMenu(
    {
      defaultOpen,
      dropdownWidth: 200,
      horizontalPosition: 'auto',
      onBlur: onClose,
      onFocus: onOpen,
      onOpenChange,
      open,
      verticalPosition: 'auto',
    },
    null,
  );

  return (
    <DropdownMenuProvider
      value={{
        calculatePosition,
        dropdownRef,
        dropdownStyles,
        eventClose,
        eventOpen,
        handleSelectItem,
        inputRef,
        keyboardHeight,
        setDropdownPosition,
        setDropdownWidth,
        setOffsets,
        toggleDropdown,
        visible,
        wrapperRef,
      }}
    >
      {children}
    </DropdownMenuProvider>
  );
}
