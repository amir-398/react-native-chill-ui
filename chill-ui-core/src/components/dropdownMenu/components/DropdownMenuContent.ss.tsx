import { DropdownMenuContentPropsSs } from '@types';
import { InputDropdownModalSs } from '@components/inputDropdown';
import { PropsWithChildren, useCallback, useEffect } from 'react';

import { styles } from '../styles/DropdownMenu.ss.styles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import { dropdownMenuContentDefaultProps } from '../utils/defaultProps';

/**
 * DropdownMenuContent component that renders the dropdown content with customizable options.
 * Supports positioning, sizing, scrolling, animations, and interaction behaviors.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent
 *   width={300}
 *   verticalPosition="top"
 *   horizontalPosition="left"
 *   offsetX={10}
 *   offsetY={5}
 * >
 *   <DropdownMenuItem>Item 1</DropdownMenuItem>
 *   <DropdownMenuItem>Item 2</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 *
 * @param children - Dropdown content (typically DropdownMenuItem components)
 * @param width - Width of the dropdown content (default: 200)
 * @param offsetX - Horizontal offset from trigger (default: 0)
 * @param offsetY - Vertical offset from trigger (default: 5)
 * @param maxHeight - Maximum height before scrolling (default: 200)
 * @param minHeight - Minimum height of the dropdown (default: 0)
 * @param hasScroll - Enable scrolling when content exceeds maxHeight (default: true)
 * @param hasAnimation - Enable animations (default: true)
 * @param style - Style object for the dropdown container
 * @param closeDropdownWhenSelectedItem - Close dropdown when item is selected (default: true)
 * @param closeWhenInteractedOutside - Close dropdown when clicking outside (default: true)
 * @param verticalPosition - Vertical positioning strategy (default: 'auto')
 * @param horizontalPosition - Horizontal positioning strategy (default: 'auto')
 * @returns Dropdown content component with positioning and interaction logic
 */
export function DropdownMenuContent(props: PropsWithChildren<DropdownMenuContentPropsSs>) {
  const {
    align = dropdownMenuContentDefaultProps.align,
    children,
    closeWhenInteractedOutside = dropdownMenuContentDefaultProps.closeWhenInteractedOutside,
    hasAnimation,
    hasScroll,
    maxHeight,
    minHeight,
    offsetX = dropdownMenuContentDefaultProps.offsetX,
    offsetY = dropdownMenuContentDefaultProps.offsetY,
    side = dropdownMenuContentDefaultProps.side,
    style,
    width,
  } = props;
  const {
    dropdownRef,
    dropdownStyles,
    setDropdownPosition,
    setDropdownWidth,
    setOffsets,
    toggleDropdown,
    visible,
    wrapperRef,
  } = useDropdownMenuContext();

  const items = Array.isArray(children) ? children : [children];
  const validItems = items.filter(Boolean);

  const customDropdownItem = useCallback((item: any) => item, []);

  useEffect(() => {
    if (width && setDropdownWidth) {
      setDropdownWidth(width);
    }
  }, [width, setDropdownWidth]);

  useEffect(() => {
    if (setDropdownPosition && side && align) {
      setDropdownPosition(side, align);
    }
  }, [side, align, setDropdownPosition]);

  useEffect(() => {
    if (setOffsets) {
      setOffsets(offsetX, offsetY);
    }
  }, [offsetX, offsetY, setOffsets]);

  const handleBackdropPress = () => {
    if (closeWhenInteractedOutside) {
      toggleDropdown();
    }
  };

  return (
    <InputDropdownModalSs
      dropdownRef={dropdownRef}
      wrapperRef={wrapperRef}
      dropdownPosition={dropdownStyles}
      backdropPress={handleBackdropPress}
      dropdownProps={{
        customSearchInput: undefined,
        data: validItems,
        dropdownItemProps: undefined,
        DropdownItemRender: customDropdownItem,
        dropdownListProps: {
          scrollEnabled: hasScroll,
        },
        hasAnimation,
        hasSearch: false,
        maxHeight,
        minHeight,
        style: [styles.dropdown, style],
        visible,
      }}
      modalProps={{
        onRequestClose: toggleDropdown,
        statusBarTranslucent: true,
        transparent: true,
        visible,
      }}
    />
  );
}
