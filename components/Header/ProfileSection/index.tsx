import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import {
  Avatar,
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Typography,
  useTheme,
} from '@mui/material';
import {
  IconAdjustments,
  IconLogout,
  IconReceipt,
  IconSettings,
} from '@tabler/icons';
import authService from '../../../services/authService';
import checkIsAdminOrManager from '../../../common/checkIsAdminOrManager';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { FormattedMessage } from 'react-intl';

const ProfileSection: React.FunctionComponent = () => {
  const theme = useTheme();
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
    authService.logOut();
    queryClient.setQueryData(CART_CLIENT, []);
    handleClose();
    router && router.push('/login');
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
        sx={{ borderRadius: theme.spacing(1.5), ml: theme.spacing(1) }}
      >
        <Avatar
          variant="rounded"
          sx={{
            cursor: 'pointer',
            borderRadius: theme.spacing(1),
            width: theme.spacing(4.25),
            height: theme.spacing(4.25),
            fontSize: theme.spacing(2.4),
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
              primary={
                <Typography variant="body2">
                  {<FormattedMessage id="profileSection.login" />}
                </Typography>
              }
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
                primary={
                  <Typography variant="body2">
                    {<FormattedMessage id="profileSection.manage" />}
                  </Typography>
                }
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
                primary={
                  <Typography variant="body2">
                    {' '}
                    {<FormattedMessage id="profileSection.oder" />}
                  </Typography>
                }
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
                  <Typography variant="body2">
                    {' '}
                    {<FormattedMessage id="profileSection.setting" />}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {' '}
                    {<FormattedMessage id="profileSection.logout" />}
                  </Typography>
                }
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
                primary={
                  <Typography variant="body2">
                    {<FormattedMessage id="profileSection.oder" />}
                  </Typography>
                }
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
                  <Typography variant="body2">
                    {<FormattedMessage id="profileSection.setting" />}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton selected={false} onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout stroke={1.5} size="1.3rem" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {<FormattedMessage id="profileSection.logout" />}
                  </Typography>
                }
              />
            </ListItemButton>
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

export default ProfileSection;
