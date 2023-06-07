/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/book/useGetListBookDetail';
import ProductLayout from '../../layout/ProductLayot';
import LoadingScreen from '../../components/loading/LoadingScreen';
import useGetRelativeBook from '@/hooks/book/useGetRelativeBook';
import { FormattedMessage } from 'react-intl';
import ReviewItem from '@/components/review/ReviewItem';

const ProductDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const [id, setId] = useState(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [hiddenDescriptionFlag, setHiddenDescriptionFlag] =
    useState<boolean>(false);
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false);
  const { data, isLoading } = useGetListBookDetail(id, !!id);
  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetRelativeBook(data, !!data);

  const numberOfLine = () => {
    if (desRef?.current) return desRef?.current?.clientHeight / 20;
    return 0;
  };

  const reviews = [
    {
      user: 'Huỳnh Gia Phú',
      rating: 1,
      comment: 'Sách dở, không đáng đọc',
    },
    {
      user: 'Lê Tấn Lộc',
      rating: 5,
      comment: 'Sách hay',
    },
    {
      user: 'Châu Nhật Long',
      rating: 3,
      comment: 'Sách đọc oke',
    },
    {
      user: 'Hứa Phú Thiên',
      rating: 1,
      comment: 'Sách quá tệ',
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      setId(router?.query?.id as any);
    }
  }, [router, setId]);

  useEffect(() => {
    if (numberOfLine() > 3 && !hiddenDescriptionFlag) {
      setHiddenDescription(true);
      setHiddenDescriptionFlag(true);
    }
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(2),
        }}
      >
        <Paper
          sx={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Stack direction="row">
              <ProductInfo data={data} isLoading={isLoading} />
            </Stack>

            {/* product info */}
            <Stack
              className="shadow"
              sx={{
                px: { xs: theme.spacing(2), sm: theme.spacing(2) },
                py: { xs: theme.spacing(2), sm: theme.spacing(4) },
                borderRadius: theme.spacing(1),
                mt: { md: theme.spacing(2), xs: theme.spacing(1) },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                <FormattedMessage id="product.productInfo" />
              </Typography>
              <Stack
                direction="row"
                spacing={{ xs: theme.spacing(2), sm: theme.spacing(4) }}
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                <Stack direction="column" spacing={1}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.productCode" />
                    </Typography>{' '}
                    <Box>{data?.isbn}</Box> {/* render authors */}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.author" />
                    </Typography>
                    <Box>
                      {data &&
                        data?.authors.map((author: any, _index: number) => {
                          if (_index === data?.authors.length - 1)
                            return <span key={_index}>{author?.name}</span>;
                          return <span key={_index}>{author?.name}, </span>;
                        })}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.publisher" />
                    </Typography>
                    <Box>{data && data?.publisher?.name}</Box>{' '}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.numberOfPage" />
                    </Typography>
                    <Box>{data?.totalPages}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.genre" />
                    </Typography>
                    {/* render genres */}
                    <Box>
                      {data &&
                        data?.genres.map((genre: any, _index: number) => {
                          if (_index === data?.genres.length - 1)
                            return <span key={_index}>{genre?.name}</span>;
                          return <span key={_index}>{genre?.name}, </span>;
                        })}{' '}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.remainder" />
                    </Typography>
                    <Box>{data && data?.availableQuantity}</Box>
                  </Stack>
                  {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Mô tả sách
                    </Typography>
                    <Stack spacing={1}>
                      {' '}
                      <Box
                        sx={
                          hiddenDescription
                            ? {
                                overflow: 'hidden',
                                maxHeight: '60px',
                                lineHeight: '20px',
                              }
                            : {
                                lineHeight: '20px',
                                overflow: 'hidden',
                              }
                        }
                      >
                        {' '}
                        <Box ref={desRef}>
                          {(data && data?.description) || 'Chưa có mô tả'}
                        </Box>
                      </Box>
                      {desRef?.current &&
                        numberOfLine() > 3 &&
                        data?.description && (
                          <Button
                            onClick={() =>
                              setHiddenDescription(!hiddenDescription)
                            }
                          >
                            {hiddenDescription ? 'Xem thêm' : 'Rút gọn'}
                          </Button>
                        )}
                    </Stack>
                  </Stack> */}
                </Stack>
              </Stack>
            </Stack>

            {/* user review  */}
            <Stack
              className="shadow"
              sx={{
                px: { xs: theme.spacing(2), sm: theme.spacing(2) },
                py: { xs: theme.spacing(2), sm: theme.spacing(4) },
                borderRadius: theme.spacing(1),
                mt: { md: theme.spacing(1), xs: theme.spacing(1) },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                Đánh giá của người dùng
              </Typography>
              <Stack
                direction="column"
                spacing={{ xs: theme.spacing(2), sm: theme.spacing(1) }}
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewItem
                      key={index}
                      rating={review.rating}
                      comment={review.comment}
                      user={review.user}
                    />
                  ))
                ) : (
                  <Typography variant="body1">No reviews available</Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack direction="column" sx={{ mb: theme.spacing(4) }}>
          <Typography
            className="shadow"
            variant="h3"
            sx={{
              my: theme.spacing(1),
              py: theme.spacing(1),
              px: theme.spacing(2),
              borderRadius: theme.spacing(1),
              display: 'inline-block',
              width: 'fit-content',
            }}
          >
            <FormattedMessage id="product.relatedProduct" />
          </Typography>
          <ProductSlides
            detailData={data}
            slideData={slideData}
            isSlideLoading={isSlideLoading}
            isSlideFetching={isSlideFetching}
          />
        </Stack>
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
