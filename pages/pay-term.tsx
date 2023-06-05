import { Paper } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import PayTermContent from '@/components/terms/paytermcontent';

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
