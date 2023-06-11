/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Divider,
  Link,
  Pagination,
  Paper,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/book/useGetListBookDetail';
import ProductLayout from '../../layout/ProductLayot';
import LoadingScreen from '../../components/loading/LoadingScreen';
import useGetRelativeBook from '@/hooks/book/useGetRelativeBook';
import { FormattedMessage } from 'react-intl';
import ReviewItem from '@/components/review/ReviewItem';
import CreateIcon from '@mui/icons-material/Create';
import authService from '@/services/authService';
import ReviewModal from '@/components/modals/ReviewModal';
import useGetListReview from '@/hooks/review/useGetListReview';

const ProductDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const [id, setId] = useState(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [hiddenDescriptionFlag, setHiddenDescriptionFlag] =
    useState<boolean>(false);
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);
  const [reviewBook, setReviewBook] = useState({
    id: 0,
    name: '',
    images: '',
  });
  const { data, isLoading } = useGetListBookDetail(id, !!id);
  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetRelativeBook(data, !!data);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    refetch,
  } = useGetListReview(data?.id ?? 0, page, 5);
  const [ratingCounts, setRatingCounts] = useState<any[]>([]);

  const numberOfLine = () => {
    if (desRef?.current) return desRef?.current?.clientHeight / 20;
    return 0;
  };

  useEffect(() => {
    // Đếm số lượng đánh giá cho mỗi số sao
    const countRatings = () => {
      const counts = Array(5).fill(0); // Khởi tạo mảng đếm với giá trị ban đầu 0

      if (reviews) {
        reviews.forEach((review) => {
          // Tăng số lượng đánh giá cho mỗi số sao tương ứng
          counts[review.rating - 1]++;
        });
      }

      setRatingCounts(counts);
    };

    countRatings();
  }, [reviews]);

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

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

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

            {/* review  */}
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
                  mb: 2,
                }}
              >
                Đánh giá sản phẩm
              </Typography>

              {/* rating */}
              <Stack>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {/* ratingStar */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{ flexDirection: 'column', ml: 4, mr: 4 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        ml={1}
                        fontWeight="bold"
                        fontSize={50}
                        lineHeight={0.8}
                      >
                        {data?.rating ?? 0}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontSize={25}
                        lineHeight={0.8}
                      >
                        /{5}
                      </Typography>
                    </Box>
                    <Rating
                      name="product-rating"
                      value={data?.rating ?? 0}
                      readOnly
                    />
                    <Typography variant="body2">
                      ({reviews && reviews.length} đánh giá)
                    </Typography>
                  </Box>

                  {/* progressBar */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      ml: theme.spacing(4),
                    }}
                    alignItems="center"
                    mb={2}
                  >
                    {ratingCounts.map((count, index) => (
                      <Box
                        key={index}
                        mr={1}
                        display="inline-flex"
                        alignItems="center"
                        sx={{ whiteSpace: 'nowrap', mb: theme.spacing(0.5) }}
                      >
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {index + 1} sao
                        </Typography>
                        <Box
                          sx={{
                            width: 250,
                            height: 10,
                            bgcolor: 'grey.300',
                            borderRadius: theme.spacing(5),
                          }}
                        >
                          <Box
                            sx={{
                              width: `${
                                reviews && (count / reviews?.length) * 100
                              }%`,
                              height: '100%',
                              bgcolor: 'primary.main',
                              borderRadius: theme.spacing(5),
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          align="center"
                          sx={{ ml: theme.spacing(1) }}
                        >
                          {reviews &&
                            Math.round((count / reviews?.length) * 100)}
                          %
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* addReviewButton */}
                  {isAuthenticated ? (
                    <Box
                      sx={{
                        ml: theme.spacing(20),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CreateIcon />}
                        sx={{ width: '300px', borderWidth: '1px' }}
                        onClick={() => {
                          setOpenReviewModal(true);
                          setReviewBook({
                            id: data?.id ?? 0,
                            name: data?.name ?? '',
                            images: data?.images[0].url ?? '',
                          });
                        }}
                      >
                        Viết đánh giá
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="body1"
                        sx={{ mx: theme.spacing(4), mb: theme.spacing(2) }}
                      >
                        Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{' '}
                        <Link
                          href="/dang-nhap"
                          underline="none"
                          color="primary"
                        >
                          đăng nhập
                        </Link>{' '}
                        hoặc{' '}
                        <Link href="/dang-ky" underline="none" color="primary">
                          đăng ký
                        </Link>
                        .
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ width: '100%', my: theme.spacing(2) }}>
                  <Divider />
                </Box>
              </Stack>

              {/* user comment */}
              <Stack
                direction="column"
                spacing={{ xs: theme.spacing(2), sm: theme.spacing(1) }}
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                {reviews && reviews.length > 0 ? (
                  reviews
                    .slice(page - 1, page + 4)
                    .map((review, index) => (
                      <ReviewItem
                        key={index}
                        rating={review?.rating}
                        comment={review?.content}
                        user={review?.user?.name}
                      />
                    ))
                ) : (
                  <Typography variant="body1">
                    Không có bài đánh giá nào
                  </Typography>
                )}
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 1.5,
                }}
              >
                <Pagination
                  className="shadow"
                  sx={{ p: 2, borderRadius: '6px' }}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={reviews ? Math.round(reviews?.length / 5) : 0}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </Box>
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
        <ReviewModal
          open={openReviewModal}
          handleClose={() => {
            setOpenReviewModal(false);
          }}
          book={reviewBook}
          refetchReviews={() => refetch()}
        />
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
