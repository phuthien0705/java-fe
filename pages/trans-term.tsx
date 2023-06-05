import { Paper } from '@mui/material';
import TransTermContent from '@/components/terms/transtermcontent';
import ProductLayout from '@/layout/ProductLayot';

const TransTerm = () => {
  return (
    <ProductLayout>
      <Paper>
        <TransTermContent />
      </Paper>
    </ProductLayout>
  );
};

export default TransTerm;
