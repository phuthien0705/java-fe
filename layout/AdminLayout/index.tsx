import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { setMenu, toggleSidebar } from '../../store/sidebarReducer';
import CustomizedSnackbar from '../../components/snackbar/CustomizedSnackbar';
import authService from '../../services/authService';
import { drawerWidth, appDrawerWidth } from '../../store/constant';
import { useRouter, Router } from 'next/router';
import { ILayout } from '@/interfaces/layout.interface';
import { NextPageWithLayout } from '@/pages/page';
import LinearProgress from '@mui/material/LinearProgress';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    ...theme.typography.mainContent2,

    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        // marginTop: '50px',
        paddingLeft: '6px',
        paddingRight: '6px',
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '6px',
        paddingRight: '6px',
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      // marginTop: '55px',
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
        paddingLeft: '6px',
        paddingRight: '6px',
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '6px',
        paddingRight: '6px',
      },
    }),
  })
);

const AdminLayout: NextPageWithLayout<ILayout> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const leftDrawerOpened = useSelector((state: any) => state.sidebar.open);
  const [loading, setLoading] = useState(false); //show loading when navigating/loading components
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, []);
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);
  useEffect(() => {
    dispatch(setMenu(!matchDownMd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: leftDrawerOpened
              ? theme.transitions.create('width')
              : 'none',
          }}
        >
          <Toolbar sx={{ padding: 0 }}>
            <Header
              handleLeftDrawerToggle={handleLeftDrawerToggle}
              hideSearch
              hideCart
              maxWidth="xl"
              hideBelowSection
              hideHomeScript
            />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        {loading ? (
          <Main theme={theme} open={leftDrawerOpened}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </Main>
        ) : (
          <Main theme={theme} open={leftDrawerOpened}>
            {children}
          </Main>
        )}
      </Box>
      <CustomizedSnackbar />
    </>
  );
};

export default AdminLayout;
