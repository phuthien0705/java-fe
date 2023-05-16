import TransTermContent from '@/components/terms/transtermcontent';
import ProductLayout from '@/layout/ProductLayot';
import { Typography, Paper } from '@mui/material';

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
