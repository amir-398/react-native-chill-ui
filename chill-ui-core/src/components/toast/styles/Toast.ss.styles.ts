import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    borderRadius: 12,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    left: 20,
    overflow: 'hidden',
    position: 'absolute',
    right: 20,
    zIndex: 50,
  },
  containerWithPadding: {
    elevation: 5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  contentRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    zIndex: 10,
  },
  customContent: {
    flex: 1,
    zIndex: 10,
  },
  icon: {
    flexShrink: 0,
  },
  progressBar: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  progressBarHeight: {
    height: 4,
  },
  textContainer: {
    flex: 1,
  },
});
