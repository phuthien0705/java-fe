import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { makeStyles } from '@mui/styles';
import ProductCard from '../cards/products/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductCardSkeleton from '../cards/Skeleton/ProductCardSkelection';
import { IProductSlides } from '@/interfaces/compontents/product.interface';
import RelativeProductEmpty from './RelativeProductEmpty';
import config from '../../config';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';
const useStyles = makeStyles({
  carousel: {
    position: 'relative',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
  },
  next: {
    height: 'fit-content',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff !important',
    translate: '50% -50%',
  },
  prev: {
    height: 'fit-content',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: 0,
    zIndex: 10,
    backgroundColor: '#fff !important',
    translate: '-50% -50%',
  },
});

const ProductSlides: FC<IProductSlides> = ({
  detailData,
  slideData,
  isSlideLoading,
  isSlideFetching,
}) => {
  const classes = useStyles();
  const matchSm = useMediaQuery('(max-width:600px)');
  const matchMd = useMediaQuery('(max-width:900px)');
  if (!isSlideLoading && detailData && detailData?.genres?.length === 0) {
    return <RelativeProductEmpty />;
  }
  return (
    <div
      style={{ position: 'relative', borderRadius: '8px', padding: 3 }}
      className="shadow"
    >
      <Swiper
        slidesPerView={matchSm ? 2 : matchMd ? 3 : 5}
        spaceBetween={5}
        slidesPerGroup={1}
        loop={true}
        navigation
        modules={[Pagination, Navigation]}
        className={classes.carousel}
      >
        {/* get only 10 item */}
        {detailData &&
          detailData?.genres?.length !== 0 &&
          slideData?.data &&
          slideData?.data.slice(0, 10).map((data: any, index: number) => (
            <SwiperSlide key={index}>
              <ProductCard
                product={data}
                slideMode
                isLoading={isSlideFetching || isSlideLoading}
                index={index}
              />
            </SwiperSlide>
          ))}
        {(isSlideLoading || isSlideFetching) && (
          <>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCardSkeleton slideMode />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSlides;
