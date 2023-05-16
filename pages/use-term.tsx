import ProductLayout from '../layout/ProductLayot/index';
import UsingTermContent from '@/components/terms/usingtermcontent';
import { Typography, Paper } from '@mui/material';

const UsingTerm = () => {
  return (
    <ProductLayout>
      <Paper>
        <UsingTermContent />
      </Paper>
    </ProductLayout>
  );
};

export default UsingTerm;
