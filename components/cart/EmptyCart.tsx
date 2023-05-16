import { Grid, Typography } from '@mui/material';

const EmptyCart: React.FunctionComponent = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          Giỏ hàng trống
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Bạn chưa thêm bất cứ một sản phẩm nào.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyCart;
