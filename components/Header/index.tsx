import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
import { FormattedMessage } from 'react-intl';

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
                  ml: '20px',
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
                  ml: '20px',
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
                  ml: '15px',
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
                  borderRadius: '12px',
                  overflow: 'hidden',
                  padding: '5px',
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
          {!hideNoti && <NotificationSection />}

          {/* profile section */}
          <ProfileSection />
        </Box>
      </Box>
      {!hideBelowSection && <BelowSection />}
    </Container>
  );
};
export default Header;
