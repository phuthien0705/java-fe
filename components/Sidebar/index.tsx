import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from '../../store/constant';
import { ISideBar } from '@/interfaces/layout.interface';

const Sidebar: React.FunctionComponent<ISideBar> = ({
  drawerOpen,
  drawerToggle,
  window,
}) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={() => drawerToggle()}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: theme.spacing(11),
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box sx={{ display: 'flex', p: theme.spacing(2), mx: 'auto' }}>
              <LogoSection />
            </Box>
          </Box>
          {matchUpMd ? (
            <Box
              sx={{
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
              }}
            >
              <MenuList />
            </Box>
          ) : (
            <Box sx={{ px: theme.spacing(2) }}>
              <MenuList />
            </Box>
          )}
        </>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
