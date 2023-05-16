import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import config from '../../../../config';
import { useRouter } from 'next/router';
import { setMenu } from '@/store/sidebarReducer';
import { FC } from 'react';

interface INavItem {
  item: any;
  level?: any;
}

const NavItem: FC<INavItem> = ({ item, level = 1 }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon && <Icon stroke={1.5} size="1.3rem" />;

  const handleClickMenuItem = (url: string) => {
    router.push(url);
    if (matchesSM) dispatch(setMenu(false));
  };

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        borderRadius: `${config.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={router.pathname == item.url}
      onClick={() => handleClickMenuItem(item.url)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={'h5'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
