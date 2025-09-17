import type { StringProps } from './string/string.ss.types';

/**
 * Props for the TabSwitch component
 */
export interface TabSwitchProps {
  /** Color of the title text */
  titleColor: string;
  /** Background color of the left tab */
  leftTabColor: string;
  /** Custom CSS classes for tabs */
  tabClassName: string;
  /** Background color of the right tab */
  rightTabColor: string;
  /** Color of the separator */
  separatorColor: string;
  /** Custom CSS classes for the title */
  titleClassName: string;
  /** Title for the left screen */
  leftScreenTitle: string;
  /** Title for the right screen */
  rightScreenTitle: string;
  /** Custom CSS classes for the left tab */
  leftTabClassName: string;
  /** Color of the active title text */
  titleColorActive: string;
  /** Custom CSS classes for the right tab */
  rightTabClassName: string;
  /** Background color of the active left tab */
  leftTabColorActive: string;
  /** Custom CSS classes for the separator */
  separatorClassName: string;
  /** Content to render in the left tab */
  leftRender: React.ReactNode;
  /** Background color of the active right tab */
  rightTabColorActive: string;
  /** Content to render in the right tab */
  rightRender: React.ReactNode;
  /** Color of the active separator */
  activeSeparatorColor: string;
  /** Size of the title text */
  titleSize: StringProps['size'];
}
