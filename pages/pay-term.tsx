import ProductLayout from '../layout/ProductLayot/index';
import PayTermContent from '@/components/terms/paytermcontent';
import { Paper } from '@mui/material';

const PayTerm = () => {
  return (
    <ProductLayout>
      <Paper>
        <PayTermContent />
      </Paper>
    </ProductLayout>
  );
};

export default PayTerm;
