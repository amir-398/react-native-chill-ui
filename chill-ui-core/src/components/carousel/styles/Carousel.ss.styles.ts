import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  carouselButtonDisabled: {
    opacity: 0.5,
  },
  carouselContainer: {
    position: 'relative',
  },
  carouselDots: {
    flexDirection: 'row',
    gap: 8,
  },
  carouselElement: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  carouselNextButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -50 }],
    zIndex: 50,
  },
  carouselPrevButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    justifyContent: 'center',
    left: 16,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  padding2: {
    padding: 8,
  },
});
