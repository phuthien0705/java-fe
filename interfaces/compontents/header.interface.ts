import { Breakpoint } from '@mui/system';

export interface IHeader {
  handleLeftDrawerToggle: Function;
  hideSidebarIcon?: boolean;
  hideSearch?: boolean;
  hideCart?: boolean;
  maxWidth?: false | Breakpoint | undefined;
  hideBelowSection?: boolean;
  hideHomeScript?: boolean;
  hideNoti?: boolean;
}
