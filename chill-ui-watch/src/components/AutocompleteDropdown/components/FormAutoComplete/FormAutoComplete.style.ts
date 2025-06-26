import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet((theme) => ({
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.sizes['2xs'],
    paddingHorizontal: theme.sizes.xs,
    paddingVertical: theme.sizes['2xs'],
  },
  primaryTextStyle: {
    fontSize: theme.sizes.s,
    lineHeight: theme.sizes.m,
  },
  secondaryTextStyle: {
    fontSize: 14,
    lineHeight: theme.sizes.m,
    color: theme.colors.text.neutral.secondary,
  },
  highlightStyle: {
    fontSize: theme.sizes.s,
    color: theme.colors.text.brand.selected,
    textDecorationLine: 'underline',
    fontWeight: 600,
    lineHeight: theme.sizes.m,
  },
  loadingContainer: {
    padding: theme.sizes['3xs'],
  },
}))
