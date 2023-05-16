import { Typography, Breadcrumbs, Link, Stack, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ProductTitle: React.FunctionComponent = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
    >
      <Box>
        <Typography variant="h3">Sản phẩm</Typography>
      </Box>
      <Box mt={{ xs: 1, sm: 0 }}>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <Link color="text.primary" href="/">
            Trang chủ
          </Link>
          <Typography color="inherit">Sản phẩm</Typography>
        </Breadcrumbs>
      </Box>
    </Stack>
  );
};

export default ProductTitle;
