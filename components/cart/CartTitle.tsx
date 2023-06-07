import { Typography, Breadcrumbs, Link, Stack, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FormattedMessage } from 'react-intl';

const CartTitle: React.FunctionComponent = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
    >
      <Box>
        <Typography variant="h3">
          <FormattedMessage id="cart.title" />
        </Typography>
      </Box>
      <Box mt={{ xs: 1, sm: 0 }}>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <Link color="text.primary" href="/">
            <FormattedMessage id="sidebar.home" />
          </Link>
          <Typography color="inherit">
            <FormattedMessage id="cart.title" />
          </Typography>
        </Breadcrumbs>
      </Box>
    </Stack>
  );
};

export default CartTitle;
