import styled from '@mui/styles/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const CustomSwipe = styled(Swiper)({
  overflowY: 'visible',
  height: '100%',
  width: '100%',
  '.swiper-wrapper': { height: 'inherit' },
  '.swiper-slide': { height: 'inherit' },
  '.swiper-pagination': { bottom: '20px !important' },
  '.swiper-pagination-bullet-active': { backgroundColor: '#2196f3' },
  '.swiper-pagination-bullet': { margin: '0 2px !important' },
});

export const ListImage = ({ listImage }: { listImage: string[] }) => {
  return (
    <div>
      {listImage.length > 0 && (
        <>
          <CustomSwipe
            slidesPerView={1}
            watchSlidesProgress={true}
            modules={[Pagination, Navigation]}
            pagination={{
              dynamicBullets: false,
              dynamicMainBullets: 3,
              clickable: true,
            }}
            navigation={true}
            // onSwiper={(swiper) => setSwiper(swiper)}
          >
            {(listImage as string[]).map((image: string, index: number) => (
              <SwiperSlide
                key={`slider-image-${index}`}
                className="not-custom rounded overflow-hidden mb-6 px-1 flex justify-center items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="post image"
                  className="object-contain mx-auto my-auto"
                  style={{
                    maxHeight: '288px',
                  }}
                />
              </SwiperSlide>
            ))}
          </CustomSwipe>
        </>
      )}
    </div>
  );
};
