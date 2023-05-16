import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import { IProductCardItem } from '@/interfaces/compontents/card.interface';

const ProductCardItem: React.FunctionComponent<IProductCardItem> = ({
  product,
  index,
}) => {
  return (
    <Box key={index} sx={{ padding: 0.5 }}>
      <ProductCard product={product} index={index} />
    </Box>
  );
};

export default ProductCardItem;
