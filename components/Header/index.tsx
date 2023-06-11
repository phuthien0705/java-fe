import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  ButtonBase,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FormattedMessage } from 'react-intl';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import CartSection from './CartSection';
import { IHeader } from '@/interfaces/compontents/header.interface';
import BelowSection from './BelowSection';
import GenreSection from './GenreSection';
import { scrollToTop } from '@/utils/scrollToTop';
import useGetListCart from '@/hooks/cart/useGetListCart';
import NotificationSection from './NotificationSection';
import { IconCamera } from '@tabler/icons-react';
import { FindBookModal } from '../modals/FindBookModal';
const Header: FC<IHeader> = ({
  handleLeftDrawerToggle,
  hideSidebarIcon = false,
  hideSearch = false,
  hideCart = false,
  maxWidth = 'lg',
  hideBelowSection = false,
  hideHomeScript = false,
  hideNoti = false,
}) => {
  const router = useRouter();
  const [isShadow, setShadow] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetListCart();
  const matches = useMediaQuery('(min-width:900px)');
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const onScroll = () => {
    const y = window.scrollY;
    if (y === 0) setShadow(false);
    else setShadow(true);
  };

  useEffect(function onFirstMount() {
    window.addEventListener('scroll', onScroll);
  }, []);
  return (
    <Container
      maxWidth={maxWidth}
      sx={
        isShadow
          ? {
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: theme.spacing(1),
              paddingLeft: { xs: theme.spacing(1), md: theme.spacing(2) },
              paddingRight: { xs: theme.spacing(1), md: theme.spacing(2) },
              '::before': {
                content: '""',
                position: 'absolute',
                bottom: '-0.4rem',
                left: theme.spacing(0),
                height: '0.4rem',
                width: '100%',
                background:
                  'linear-gradient(rgba(136, 165, 191, 0.48),transparent)',
              },
            }
          : {
              paddingLeft: { xs: theme.spacing(1), md: theme.spacing(2) },
              paddingRight: { xs: theme.spacing(1), md: theme.spacing(2) },
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: theme.spacing(1),
            }
      }
    >
      <Box
        sx={{
          paddingTop: theme.spacing(1),
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          alignItems: 'center',
        }}
      >
        {' '}
        <Box
          sx={{
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="div"
            sx={{
              marginRight: { xs: theme.spacing(0), md: theme.spacing(4) },
              marginBottom: { xs: theme.spacing(2), md: theme.spacing(0) },
            }}
          >
            <LogoSection />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: { xs: 'space-between', md: 'flex-end' },
          }}
        >
          {!hideHomeScript && matches && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
              }}
            >
              <Typography
                onClick={() => {
                  if (router?.pathname === '/') {
                    scrollToTop();
                  } else {
                    router.push({ pathname: '/' });
                  }
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#000',
                  marginRight: theme.spacing(1),
                  whiteSpace: 'nowrap',
                }}
              >
                <FormattedMessage id={'sidebar.home'} />
              </Typography>
              <GenreSection />
              <Typography
                onClick={() => {
                  router.push({ pathname: '/blogs' });
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginRight: theme.spacing(1),
                  whiteSpace: 'nowrap',
                  color: 'rgb(29,37,69)',
                  ml: theme.spacing(2.5),
                }}
              >
                <FormattedMessage id={'sidebar.blog'} />
              </Typography>
              <Typography
                onClick={() => {
                  router.push({ pathname: '/contact-us' });
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginRight: theme.spacing(1),
                  whiteSpace: 'nowrap',
                  color: 'rgb(29,37,69)',
                  ml: theme.spacing(2.5),
                }}
              >
                <FormattedMessage id={'sidebar.contact'} />
              </Typography>
              <Typography
                onClick={() => {
                  router.push({ pathname: '/about-us' });
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginRight: theme.spacing(1),
                  whiteSpace: 'nowrap',
                  color: 'rgb(29,37,69)',
                  ml: theme.spacing(2),
                }}
              >
                <FormattedMessage id={'sidebar.introduce'} />
              </Typography>
            </Box>
          )}

          {!hideSidebarIcon && !matches && (
            <Box
              className="shadow"
              sx={{ borderRadius: theme.spacing(1) }}
              onClick={() => handleLeftDrawerToggle()}
            >
              <IconButton
                size="small"
                color="secondary"
                sx={{
                  borderRadius: theme.spacing(1.5),
                  overflow: 'hidden',
                  padding: theme.spacing(0.5),
                  margin: 0,
                  height: 'fit-content',
                  width: 'fit-content !important',
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          {/* header search */}
          {!hideSearch && <SearchSection />}

          {/*  profile & cart */}
          {!hideCart && (
            <CartSection
              data={data?.items ?? []}
              isLoading={isLoading}
              isFetching={isFetching}
              refetch={refetch}
            />
          )}
          {/* noti section */}
          {!hideNoti && !router.pathname.includes('/admin') && (
            <NotificationSection />
          )}

          {/* search section */}
          {!router.pathname.includes('/admin') && (
            <Box
              sx={{
                ml: { xs: theme.spacing(0.5), sm: theme.spacing(1) },
                mr: { xs: theme.spacing(0.5), sm: theme.spacing(1) },
              }}
            >
              <ButtonBase
                id="search-book-button"
                onClick={() => setOpen((i) => !i)}
                sx={{ borderRadius: '12px' }}
                className="shadow"
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
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.primary.dark,
                      color: theme.palette.primary.light,
                    },
                  }}
                  color="inherit"
                >
                  <IconCamera stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          )}
          {/* profile section */}
          <ProfileSection />
        </Box>
      </Box>
      {!hideBelowSection && <BelowSection />}
      <FindBookModal isOpen={open} closeModal={() => setOpen((i) => !i)} />
    </Container>
  );
};
export default Header;
