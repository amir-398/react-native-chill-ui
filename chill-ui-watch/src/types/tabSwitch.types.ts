import type { StringProps } from './string.types';

export interface TabSwitchProps {
  titleColor: string;
  leftTabColor: string;
  tabClassName: string;
  rightTabColor: string;
  separatorColor: string;
  titleClassName: string;
  leftScreenTitle: string;
  rightScreenTitle: string;
  leftTabClassName: string;
  titleColorActive: string;
  rightTabClassName: string;
  leftTabColorActive: string;
  separatorClassName: string;
  leftRender: React.ReactNode;
  rightTabColorActive: string;
  rightRender: React.ReactNode;
  activeSeparatorColor: string;
  titleSize: StringProps['size'];
}
