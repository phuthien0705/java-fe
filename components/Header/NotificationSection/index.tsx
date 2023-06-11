import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  CircularProgress,
  ListItemButton,
  ListItemText,
  Menu,
  MenuList,
  Typography,
  useTheme,
} from '@mui/material';
import { IconBell } from '@tabler/icons-react';
import { useState } from 'react';
import authService from '@/services/authService';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useGetNotifications from '@/hooks/notification/useGetNotifications';
import { FormattedMessage } from 'react-intl';

export default function NotificationSection() {
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  const data: any = [];
  const queryClient = useQueryClient();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    queryReturn: { data: notificationData, isLoading: isLoadingNotification },
  } = useGetNotifications(page, 5);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogin = () => {
    router && router.push({ pathname: '/login' });
  };
  function extractTrackingNumber(str: string) {
    const regex = /(?:tracking number\s)([A-Z0-9-]+)/i;
    const match = str.match(regex);
    if (match && match.length >= 2) {
      return match[1];
    } else {
      return null;
    }
  }
  return (
    <Box
      sx={{
        ml: { xs: theme.spacing(0.5), sm: theme.spacing(1) },
        mr: { xs: theme.spacing(0.5), sm: theme.spacing(1) },
      }}
    >
      <ButtonBase
        id="notification-button"
        onClick={handleClick}
        sx={{ borderRadius: '12px' }}
        className="shadow"
      >
        <Badge badgeContent={data ? data?.length : 0} color="primary">
          <Avatar
            variant="rounded"
            sx={{
              cursor: 'pointer',
              borderRadius: theme.spacing(1),
              width: theme.spacing(4.25),
              height: theme.spacing(4.25),
              fontSize: theme.spacing(2.4),
              transition: 'all .2s ease-in-out',
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light,
              },
            }}
            color="inherit"
          >
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </Badge>
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
        {isLoadingNotification ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  <CircularProgress />
                </Typography>
              }
            />
          </ListItemButton>
        ) : !authService.isAuthenticated() ? (
          <ListItemButton selected={false} onClick={handleClickLogin}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  {<FormattedMessage id="profileSection.login" />}
                </Typography>
              }
            />
          </ListItemButton>
        ) : (
          <MenuList sx={{ padding: 0 }}>
            {notificationData &&
              notificationData.datas.map((item) => {
                return (
                  <ListItemButton key={item.id}>
                    <ListItemText
                      primary={
                        item.type === 'ORDER' ? (
                          <Typography variant="body2">
                            Đơn hàng{' '}
                            <b>{extractTrackingNumber(item.content)}</b> đang
                            trong trạng thái xử lý
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            Mật khẩu của bạn đã được cập nhât
                          </Typography>
                        )
                      }
                    />
                  </ListItemButton>
                );
              })}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}
