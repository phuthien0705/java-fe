import { Paper } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import UsingTermContent from '@/components/terms/usingtermcontent';

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
