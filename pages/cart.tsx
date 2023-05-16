import { Box, Paper, Container } from '@mui/material';
import ProductLayout from '../layout/ProductLayot';
import CartTitle from '../components/cart/CartTitle';
import CartItems from '../components/cart/CartItems';
import dynamic from 'next/dynamic';

const Cart = () => {
  return (
    <ProductLayout hideFooter={true}>
      <Container maxWidth="md" disableGutters>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper
            className="shadow"
            sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 }, mb: 2 }}
          >
            <CartTitle />
          </Paper>
          <Paper
            className="shadow"
            sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 } }}
          >
            <CartItems />
          </Paper>
        </Box>
      </Container>
    </ProductLayout>
  );
};

export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
