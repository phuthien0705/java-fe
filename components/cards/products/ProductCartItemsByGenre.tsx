import { Box, Stack, Typography } from '@mui/material';
import ProductCardItem from './ProductCardItem';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import CustomNoRowsOverlay from '../../empty/CustomNoRowsOverlay';
import { IProductCardItemsByGenre } from '@/interfaces/compontents/card.interface';
import config from '../../../config';
import useGetBookByGenre from '@/hooks/book/useGetBookByGenre';

const ProductCardItemsByGenre: React.FunctionComponent<
  IProductCardItemsByGenre
> = ({ title, titleIcon, slideToShow = 5, genreId = null }) => {
  const { data: dataFiltered, isLoading } = useGetBookByGenre(
    genreId,
    slideToShow,
    !!genreId
  );
  const renderProducts = () => {
    if (isLoading)
      return new Array(slideToShow)
        .fill(0)
        .map((placeholder, placeholderIndex) => (
          <div key={placeholderIndex}>
            <ProductCardSkeleton />
          </div>
        ));

    return dataFiltered && dataFiltered?.datas?.length > 0 ? (
      dataFiltered?.datas.map((product: any, index: number) => {
        return <ProductCardItem key={index} product={product} index={index} />;
      })
    ) : (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <CustomNoRowsOverlay />
        <Typography sx={{ textAlign: 'center' }}>Chưa có sản phẩm.</Typography>
      </Box>
    );
  };

  return (
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        rowGap: '0.2rem',
        flexDirection: 'column',
        borderRadius: `${config.borderRadius}px`,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
      className="shadow"
    >
      <Box sx={{ backgroundColor: '#fff' }}>
        {title && (
          <Stack
            sx={{
              px: 2,
              pt: 2,
            }}
            direction={'row'}
            spacing={1}
          >
            {titleIcon ? titleIcon : null}
            <Typography fontWeight={'bold'} fontSize={'1rem'} variant={'h5'}>
              {title}
            </Typography>
          </Stack>
        )}
        <Box sx={{ p: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              columnGap: '5px',
              rowGap: '5px',
            }}
          >
            {renderProducts()}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCardItemsByGenre;
