import { useCallback, useEffect, useMemo } from 'react';

import { debounce } from '../../../utils';
import { DropdownMenuItem } from '../../../types';
import { DEFAULT_CONFIG } from '../../inputSelectDropdown/types';

interface DropdownMenuSelectionParams {
  hasAutoScroll?: boolean;
  items: DropdownMenuItem[];
  selectedItem?: DropdownMenuItem;
  onScrollToIndex?: (index: number) => void;
  onItemSelect?: (item: DropdownMenuItem) => void;
}

export default function useDropdownMenuSelection({
  hasAutoScroll = false,
  items,
  onItemSelect,
  onScrollToIndex,
  selectedItem,
}: DropdownMenuSelectionParams) {
  const scrollToSelectedIndex = useMemo(
    () =>
      debounce(() => {
        if (!hasAutoScroll || !items?.length || !selectedItem || !onScrollToIndex) return;

        const index = items.findIndex(item => item.id === selectedItem.id);

        if (index > -1 && index < items.length) {
          onScrollToIndex(index);
        }
      }, DEFAULT_CONFIG.DEBOUNCE_DELAY),
    [hasAutoScroll, items, selectedItem, onScrollToIndex],
  );

  // Scroll vers l'élément sélectionné quand le dropdown s'ouvre
  const handleDropdownOpen = useCallback(() => {
    if (hasAutoScroll && selectedItem) {
      setTimeout(() => {
        scrollToSelectedIndex();
      }, 150); // Délai pour s'assurer que la liste est rendue
    }
  }, [hasAutoScroll, selectedItem, scrollToSelectedIndex]);

  // Gérer la sélection d'un élément
  const handleSelectItem = useCallback(
    (item: DropdownMenuItem) => {
      onItemSelect?.(item);
    },
    [onItemSelect],
  );

  // Nettoyage du debounce
  useEffect(
    () => () => {
      scrollToSelectedIndex.cancel();
    },
    [scrollToSelectedIndex],
  );

  return {
    handleDropdownOpen,
    handleSelectItem,
    scrollToSelectedIndex,
  };
}
