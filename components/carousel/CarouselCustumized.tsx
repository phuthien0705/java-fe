import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { makeStyles } from '@mui/styles';
import config from '../../config';
import Image from 'next/image';
import Carousel1 from '@/public/img/carousel_1.jpg';
import Carousel2 from '@/public/img/carousel_2.png';
import Carousel3 from '@/public/img/carousel_3.jpg';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

const useStyles = makeStyles({
  carousel: {
    position: 'relative',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    '& .swiper-pagination-bullet': {
      width: '10px',
      height: '10px',
      backgroundColor: '#fff',
    },
    '& .swiper-pagination-bullet-active': { backgroundColor: '#673ab7' },
    '& .swiper-slide-active': { width: '100%' },
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    '& img': {
      width: '100%',
      maxHeight: '25rem',
      objectFit: 'cover',
    },
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
const CarouselCustumized: React.FunctionComponent = () => {
  const classes = useStyles();
  const images = ['Img1', 'Img2', 'Img3'];

  return (
    <div
      style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}
      className="shadow"
    >
      <Swiper
        spaceBetween={1}
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 5000 }}
        className={classes.carousel}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
      >
        {/* <SwiperSlide className={classes.carouselItem}>
          <Image alt={'image1'} src={Img1} />
        </SwiperSlide> */}
        <SwiperSlide className={classes.carouselItem}>
          <Image alt={'image2'} src={Carousel1} />
        </SwiperSlide>
        <SwiperSlide className={classes.carouselItem}>
          <Image alt={'image2'} src={Carousel2} />
        </SwiperSlide>
        <SwiperSlide className={classes.carouselItem}>
          <Image alt={'image2'} src={Carousel3} />
        </SwiperSlide>
        {/* <SwiperSlide className={classes.carouselItem}>
          <Image alt={'image3'} src={Img3} />
        </SwiperSlide> */}
      </Swiper>{' '}
    </div>
  );
};

export default CarouselCustumized;
