import type { ReactElement } from 'react';

import { View } from 'react-native';
import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';

import {
  IAutocompleteDropdownContext,
  IAutocompleteDropdownContextProviderProps,
  IAutocompleteInstance,
} from './AutoCompleteDropdownContext.props';

export const AutocompleteContext = React.createContext<IAutocompleteDropdownContext>({
  forceCalculatePositions: () => null,
  getInstance: () => undefined,
  registerInstance: () => null,
  setDropdownContent: () => null,
  setDropdownPosition: () => null,
  setShowDropdown: () => null,
  unregisterInstance: () => null,
});

export function AutocompleteDropdownContext({ children, headerOffset = 0 }: IAutocompleteDropdownContextProviderProps) {
  const [instances, setInstances] = useState<Map<string, IAutocompleteInstance>>(new Map());

  const wrapperRef = useRef<View | null>(null);
  const dropdownContainerRef = useRef<View | null>(null);
  const positionTrackingIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Fonction pour enregistrer une nouvelle instance
  const registerInstance = useCallback(
    (id: string, inputContainerRef: React.MutableRefObject<View | null>, offsetX?: number, offsetY?: number) => {
      setInstances(prev => {
        const newInstances = new Map(prev);
        newInstances.set(id, {
          contentStyles: undefined,
          dropdownContent: undefined,
          dropdownPosition: undefined,
          id,
          inputContainerRef,
          offsetX,
          offsetY,
          showDropdown: false,
        });
        return newInstances;
      });
    },
    [],
  );

  const unregisterInstance = useCallback((id: string) => {
    setInstances(prev => {
      const newInstances = new Map(prev);
      newInstances.delete(id);
      return newInstances;
    });
  }, []);

  const setDropdownContent = useCallback((id: string, content: ReactElement | undefined) => {
    setInstances(prev => {
      const newInstances = new Map(prev);
      const instance = newInstances.get(id);
      if (instance) {
        newInstances.set(id, { ...instance, dropdownContent: content });
      }
      return newInstances;
    });
  }, []);

  const setDropdownPosition = useCallback((id: string, position: 'top' | 'bottom' | 'auto' | undefined) => {
    setInstances(prev => {
      const newInstances = new Map(prev);
      const instance = newInstances.get(id);
      if (instance) {
        newInstances.set(id, { ...instance, dropdownPosition: position });
      }
      return newInstances;
    });
  }, []);

  // Fonction pour afficher/masquer le dropdown d'une instance
  const setShowDropdown = useCallback((id: string, show: boolean) => {
    setInstances(prev => {
      const newInstances = new Map(prev);
      const instance = newInstances.get(id);
      if (instance) {
        newInstances.set(id, { ...instance, showDropdown: show });
      }
      return newInstances;
    });
  }, []);

  // Fonction pour récupérer une instance
  const getInstance = useCallback((id: string) => instances.get(id), [instances]);

  const calculatePositionsForInstances = useCallback(() => {
    const activeInstances = [...instances.values()].filter(
      instance => instance.showDropdown && instance.dropdownPosition && instance.inputContainerRef.current,
    );

    if (activeInstances.length === 0) {
      return;
    }

    activeInstances.forEach(instance => {
      const { dropdownPosition, id, inputContainerRef, offsetX = 0, offsetY = 0 } = instance;

      if (!inputContainerRef.current || !wrapperRef.current) {
        return;
      }
      try {
        inputContainerRef.current.measureInWindow((x, y, width, height) => {
          if (!wrapperRef.current) {
            return;
          }

          wrapperRef.current.measureInWindow((wrapperX, wrapperY, _wrapperWidth, wrapperHeight) => {
            const inputMeasurements = {
              bottomY: y - wrapperY + height,
              height,
              topY: y - wrapperY,
              width,
              x: x - wrapperX,
            };

            let contentStyles: { top?: number; left: number; width?: number; bottom?: number } | undefined;

            if (dropdownPosition === 'top') {
              const distanceFromBottom = wrapperHeight - inputMeasurements.topY + 5 + headerOffset + offsetY;
              contentStyles = {
                bottom: distanceFromBottom,
                left: inputMeasurements.x + offsetX,
                top: undefined,
                width: inputMeasurements.width,
              };
            } else if (dropdownPosition === 'bottom') {
              contentStyles = {
                bottom: undefined,
                left: inputMeasurements.x + offsetX,
                top: inputMeasurements.topY + inputMeasurements.height + 5 + headerOffset + offsetY,
                width: inputMeasurements.width,
              };
            }

            setInstances(prev => {
              const newInstances = new Map(prev);
              const currentInstance = newInstances.get(id);
              if (currentInstance && JSON.stringify(contentStyles) !== JSON.stringify(currentInstance.contentStyles)) {
                newInstances.set(id, { ...currentInstance, contentStyles });
                return newInstances;
              }
              return prev;
            });
          });
        });
      } catch {
        // ignore measurement errors
      }
    });
  }, [instances, headerOffset]);

  useEffect(() => {
    if (positionTrackingIntervalRef.current) {
      clearInterval(positionTrackingIntervalRef.current);
      positionTrackingIntervalRef.current = undefined;
    }

    const hasActiveDropdowns = [...instances.values()].some(instance => {
      const isActive = instance.showDropdown && instance.dropdownPosition;

      return isActive;
    });

    if (hasActiveDropdowns) {
      const timeoutId = setTimeout(() => {
        calculatePositionsForInstances();
      }, 50);
      positionTrackingIntervalRef.current = setInterval(() => {
        requestAnimationFrame(() => {
          calculatePositionsForInstances();
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (positionTrackingIntervalRef.current) {
          clearInterval(positionTrackingIntervalRef.current);
        }
      };
    }

    return () => {
      if (positionTrackingIntervalRef.current) {
        clearInterval(positionTrackingIntervalRef.current);
      }
    };
  }, [instances, calculatePositionsForInstances]);

  const contextValue = useMemo(
    () => ({
      forceCalculatePositions: calculatePositionsForInstances,
      getInstance,
      registerInstance,
      setDropdownContent,
      setDropdownPosition,
      setShowDropdown,
      unregisterInstance,
    }),
    [
      registerInstance,
      unregisterInstance,
      setDropdownContent,
      setDropdownPosition,
      setShowDropdown,
      getInstance,
      calculatePositionsForInstances,
    ],
  );

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <View ref={wrapperRef} className="flex-1">
        {children}
      </View>
      {/* Render dropdowns for all instances */}
      {(() => {
        const instancesArray = [...instances.values()];

        return instancesArray.map(instance => {
          const shouldRender = instance.dropdownContent && instance.showDropdown;
          const hasStyles = !!instance.contentStyles;

          if (!shouldRender || !hasStyles) {
            return null;
          }

          const dropdownContainerStyle = {
            position: 'absolute' as const,
            zIndex: 9999,
            ...instance.contentStyles,
          };

          return (
            <View key={instance.id} ref={dropdownContainerRef} style={dropdownContainerStyle}>
              {instance.dropdownContent}
            </View>
          );
        });
      })()}
    </AutocompleteContext.Provider>
  );
}
