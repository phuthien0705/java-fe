import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Typography,
} from '@mui/material';
import {
  IconLogout,
  IconSettings,
  IconAdjustments,
  IconReceipt,
} from '@tabler/icons';
import authService from '../../../services/authService';
import checkIsAdminOrManager from '../../../common/checkIsAdminOrManager';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { CART_CLIENT } from '@/constants/queryKeyName';

const ProfileSection: React.FunctionComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>({ name: '', roles: ['user'] });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    if (router.pathname.includes('/admin')) {
      router && router.push('/');
    }

    handleClose();
    authService.logOut();

    queryClient.setQueryData(CART_CLIENT, []);
  };
  const handleClickLogin = () => {
    router && router.push({ pathname: '/login' });
  };

  const handleListItemClick = (route = '') => {
    handleClose();

    if (route && route !== '') {
      router.push(route);
    }
  };

  useEffect(() => {
    setUserInfo(authService.getUser());
  }, []);

  return (
    <div>
      <ButtonBase
        className="shadow"
        id="basic-base-button"
        onClick={handleClick}
        sx={{ borderRadius: '12px' }}
      >
        <Avatar
          variant="rounded"
          sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            width: '34px',
            height: '34px',
            fontSize: '1.2rem',
            transition: 'all .2s ease-in-out',
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
            },
          }}
          color="inherit"
        >
          <IconSettings stroke={1.5} size="1.3rem" />
        </Avatar>
      </ButtonBase>
      <Menu
        id="menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-base-button',
        }}
      >
        {!authService.isAuthenticated() ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={<Typography variant="body2">Đăng nhập</Typography>}
            />
          </ListItemButton>
        ) : checkIsAdminOrManager(userInfo?.roles) ? (
          <MenuList sx={{ padding: 0 }}>
            <ListItemButton
              selected={router.pathname.includes('/admin')}
              onClick={() => handleListItemClick('/admin/statistic')}
            >
              <ListItemIcon>
                <IconAdjustments stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Quản lý</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              selected={router.pathname.includes('/orders')}
              onClick={() => handleListItemClick('/orders')}
            >
              <ListItemIcon>
                <IconReceipt stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đơn hàng</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              selected={router.pathname.includes('/profile')}
              onClick={() => handleListItemClick('/profile')}
            >
              <ListItemIcon>
                <IconSettings stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Cài đặt tài khoản</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đăng xuất</Typography>}
              />
            </ListItemButton>
          </MenuList>
        ) : (
          <MenuList>
            <ListItemButton
              selected={router.pathname.includes('/orders')}
              onClick={() => handleListItemClick('/orders')}
            >
              <ListItemIcon>
                <IconReceipt stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đơn hàng</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              selected={router.pathname.includes('/profile')}
              onClick={() => handleListItemClick('/profile')}
            >
              <ListItemIcon>
                <IconSettings stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Cài đặt tài khoản</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đăng xuất</Typography>}
              />
            </ListItemButton>
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

export default ProfileSection;
