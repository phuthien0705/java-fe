import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Container,
  IconButton,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import CartSection from './CartSection';
import { FC, useState, useEffect } from 'react';
import { IHeader } from '@/interfaces/compontents/header.interface';
import useGetListCart from '@/hooks/client/useGetListCart';
import BelowSection from './BelowSection';
import GenreSection from './GenreSection';
import { useRouter } from 'next/router';
import { scrollToTop } from '@/utils/scrollToTop';

const Header: FC<IHeader> = ({
  handleLeftDrawerToggle,
  hideSidebarIcon = false,
  hideSearch = false,
  hideCart = false,
  maxWidth = 'lg',
  hideBelowSection = false,
  hideHomeScript = false,
}) => {
  const router = useRouter();
  const [isShadow, setShadow] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetListCart();
  const matches = useMediaQuery('(min-width:900px)');

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
              paddingBottom: 1,
              paddingLeft: { xs: '8px', md: '16px' },
              paddingRight: { xs: '8px', md: '16px' },
              '::before': {
                content: '""',
                position: 'absolute',
                bottom: '-0.4rem',
                left: 0,
                height: '0.4rem',
                width: '100%',
                background:
                  'linear-gradient(rgba(136, 165, 191, 0.48),transparent)',
              },
            }
          : {
              paddingLeft: { xs: '8px', md: '16px' },
              paddingRight: { xs: '8px', md: '16px' },
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 1,
            }
      }
    >
      <Box
        sx={{
          paddingTop: 1,
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
              marginRight: { xs: 0, md: 4 },
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
                  marginRight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                Trang chủ
              </Typography>
              <GenreSection />
              <Typography
                onClick={() => {
                  router.push({ pathname: '/contact-us' });
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginRight: 1,
                  whiteSpace: 'nowrap',
                  color: 'rgb(29,37,69)',
                  ml: '20px',
                }}
              >
                Liên hệ
              </Typography>
              <Typography
                onClick={() => {
                  router.push({ pathname: '/about-us' });
                }}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginRight: 1,
                  whiteSpace: 'nowrap',
                  color: 'rgb(29,37,69)',
                  ml: '15px',
                }}
              >
                Giới thiệu
              </Typography>
            </Box>
          )}

          {!hideSidebarIcon && !matches && (
            <Box
              className="shadow"
              sx={{ borderRadius: '8px' }}
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
              data={data}
              isLoading={isLoading}
              isFetching={isFetching}
              refetch={refetch}
            />
          )}
          <ProfileSection />
        </Box>
      </Box>
      {!hideBelowSection && <BelowSection />}
    </Container>
  );
};
export default Header;
