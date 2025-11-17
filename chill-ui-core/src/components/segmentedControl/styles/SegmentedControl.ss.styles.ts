import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    alignSelf: 'center',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 64,
    width: '100%',
  },
  indicatorContainer: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: '80%',
  },
  indicatorContainerFreezed: {
    position: 'absolute',
    top: '10%',
  },
  panelContainer: {
    width: '100%',
  },
  panelContentContainer: {
    marginTop: 16,
    width: '100%',
  },
  triggerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerContainerDisabled: {
    opacity: 0.5,
  },
});
