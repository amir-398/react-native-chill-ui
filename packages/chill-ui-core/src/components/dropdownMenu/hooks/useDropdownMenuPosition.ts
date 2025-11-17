import { RefObject } from 'react';
import { Dimensions, Keyboard, Platform, TextInput } from 'react-native';

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right' | 'center';

interface DropdownMenuPositionProps {
  dropdownWidth: number;
  waitForKeyboard: boolean;
  verticalPosition: 'top' | 'bottom' | 'auto';
  inputRef: RefObject<TextInput | null | undefined>;
  horizontalPosition: 'left' | 'right' | 'center' | 'auto';
  setDropdownPosition: (vertical: VerticalPosition, horizontal: HorizontalPosition) => void;
}

const useDropdownMenuPosition = ({
  dropdownWidth,
  horizontalPosition,
  inputRef,
  setDropdownPosition,
  verticalPosition,
  waitForKeyboard,
}: DropdownMenuPositionProps) => {
  const getDropdownPosition = async (): Promise<[VerticalPosition, HorizontalPosition]> => {
    try {
      if (!inputRef.current) {
        throw new Error('Container ref is not defined');
      }

      const [triggerX, triggerY, triggerWidth] = await new Promise<[number, number, number, number]>(
        (resolve, _reject) => {
          inputRef.current?.measureInWindow((x, y, width, height) => {
            resolve([x, y, width, height]);
          });
        },
      );

      const delay = waitForKeyboard ? Platform.select({ android: 250, default: 1, ios: 600 }) : 1;

      return await new Promise<[VerticalPosition, HorizontalPosition]>(resolve => {
        setTimeout(() => {
          const kbHeight = Keyboard.metrics?.()?.height ?? 0;
          const screenHeight = Dimensions.get('window').height;
          const screenWidth = Dimensions.get('window').width;

          // Calcul de la position verticale
          let finalVerticalPosition: VerticalPosition;
          if (verticalPosition === 'auto') {
            const shouldOpenDown = (screenHeight - kbHeight) / 2 > triggerY;
            finalVerticalPosition = shouldOpenDown ? 'bottom' : 'top';
          } else {
            finalVerticalPosition = verticalPosition;
          }

          // Calcul de la position horizontale
          let finalHorizontalPosition: HorizontalPosition;
          if (horizontalPosition === 'auto') {
            // Calculer l'espace disponible pour chaque option
            const spaceOnRight = screenWidth - triggerX;
            const spaceOnLeft = triggerX + triggerWidth;

            // Pour centrer, vérifier si on peut centrer le dropdown sur le trigger
            const triggerCenter = triggerX + triggerWidth / 2;
            const dropdownHalfWidth = dropdownWidth / 2;
            const centerLeftPosition = triggerCenter - dropdownHalfWidth;
            const centerRightPosition = triggerCenter + dropdownHalfWidth;

            // Vérifier si on peut centrer
            if (centerLeftPosition >= 0 && centerRightPosition <= screenWidth) {
              finalHorizontalPosition = 'center';
            } else if (spaceOnRight >= dropdownWidth) {
              // Assez d'espace à droite, aligner à gauche du trigger
              finalHorizontalPosition = 'left';
            } else if (spaceOnLeft >= dropdownWidth) {
              // Pas assez d'espace à droite, aligner à droite du trigger
              finalHorizontalPosition = 'right';
            } else {
              // Choisir le côté avec le plus d'espace
              finalHorizontalPosition = spaceOnRight > spaceOnLeft ? 'left' : 'right';
            }
          } else {
            finalHorizontalPosition = horizontalPosition;
          }

          setDropdownPosition(finalVerticalPosition, finalHorizontalPosition);
          resolve([finalVerticalPosition, finalHorizontalPosition]);
        }, delay);
      });
    } catch {
      setDropdownPosition('bottom', 'left');
      return ['bottom', 'left'];
    }
  };

  return { getDropdownPosition };
};

export default useDropdownMenuPosition;
