import { Box, Grid, Stack, Typography } from '@mui/material';
import ProductCardItem from './ProductCardItem';
import { makeStyles } from '@mui/styles';
import config from '../../../config';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import CustomNoRowsOverlay from '../../empty/CustomNoRowsOverlay';
import { IProductCardItems } from '@/interfaces/compontents/card.interface';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    rowGap: '0.2rem',
    flexDirection: 'column',
    borderRadius: `${config.borderRadius}px`,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});

const ProductCardItems: React.FunctionComponent<IProductCardItems> = ({
  data,
  title,
  titleIcon,
  titleBackground = '#fff',
  isLoading = false,
  slideToShow = 5,
  genreId = null,
}) => {
  const classes = useStyles();
  const dataFiltered = !genreId
    ? data
    : data
    ? data?.filter((item: any) => {
        if (
          !item?.genres?.every((itemGenre: any) => itemGenre?.id != genreId)
        ) {
          return item;
        }
      })
    : [];
  const renderProducts = () => {
    if (isLoading) {
      // create a array with n elements and map them
      return Array.from(Array(slideToShow).keys()).map(
        (item: any, _index: number) => <ProductCardSkeleton key={_index} />
      );
    }

    return dataFiltered?.length > 0 ? (
      dataFiltered.slice(0, slideToShow).map((product: any, index: number) => {
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

export default ProductCardItems;
