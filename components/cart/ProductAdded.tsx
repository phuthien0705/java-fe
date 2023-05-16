import { IProductAdded } from '@/interfaces/compontents/cart.interface';
import { Typography, Stack } from '@mui/material';

const ProductAdded: React.FunctionComponent<IProductAdded> = ({ amount }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ margin: { xs: '16px 16px 0 16px', md: 2 }, pt: 1 }}
    >
      <div>
        <Typography variant="h5">Sản phẩm</Typography>
      </div>
      <div>
        <Typography variant="body1">({amount})</Typography>
      </div>
    </Stack>
  );
};

export default ProductAdded;
