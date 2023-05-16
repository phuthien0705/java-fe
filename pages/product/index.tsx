import {
  Typography,
  Box,
  Grid,
  CardContent,
  Paper,
  IconButton,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  ButtonGroup,
  Drawer,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProductLayout from '../../layout/ProductLayot';
import ProductCardItems from '../../components/cards/products/ProductCardItems';
import useGetListGenreClient from '@/hooks/client/useGetListGenreClient';
import useGetListPublisherClient from '@/hooks/client/useGetListPublisherClient';
import { useRouter } from 'next/router';
import { filterBook } from '@/apis/product.api';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { useToast } from '@/hooks/useToast';
import ProductTitle from '@/components/products/ProductTitle';

const drawerWidth = 400;
const DivStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: { theme: any; open: boolean }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));
const Product = () => {
  const matches = useMediaQuery('(min-width:700px)');
  const theme: any = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [page, setPage] = useState<number>(1);
  const [listBook, setListBook] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [openSort, setOpenSort] = useState(false);
  const [genreList, setGenreList] = useState<number[]>([]);
  const [publisherList, setPublisherList] = useState<number[]>([]);
  const [price, setPrice] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const getListGenreQuery = useGetListGenreClient();
  const getListPublisherQuery = useGetListPublisherClient();

  const { data: publisherData, isLoading: isPublisherLoading } =
    getListPublisherQuery;
  const { data: genreData, isLoading: isGenreLoading } = getListGenreQuery;

  const { mutate: getFilterBook, isLoading: isGetingListFilterBook } =
    useMutation((data: any) => filterBook(data), {
      onSuccess: (data: any) => {
        setListBook(data?.data);
        setMeta(data?.meta);
      },
      onError: () => {
        toast({ type: 'error', message: 'Lỗi trong quá trình lấy dữ liệu' });
      },
    });

  const handleToggleFilter = () => {
    setOpenFilter((prevOpenSort) => !prevOpenSort);
  };

  const anchorRef = useRef<any>(null);

  const handleClearAllFilter = () => {
    setGenreList([]);
    setPublisherList([]);
    setPrice('');
    getFilterBook({
      genres: '',
      publishers: '',
      price: '',
      order_by: '',
      page: 1,
    });
  };

  const prevOpenSort = useRef(openSort);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let genreParam = '';
    let publisherParam = '';
    genreList.forEach((genre: number) => {
      genreParam += genre + '_';
    });
    publisherList.forEach((publisher: number) => {
      publisherParam += publisher + '_';
    });

    genreParam = genreParam.slice(0, -1);
    publisherParam = publisherParam.slice(0, -1);

    setPage(1);

    getFilterBook({
      genres: genreParam || '',
      publishers: publisherParam || '',
      price: price || '',
      order_by: '',
      page: 1,
    });
  };
  useEffect(() => {
    if (prevOpenSort.current === true && openSort === false) {
      anchorRef.current.focus();
    }

    prevOpenSort.current = openSort;
  }, [openSort]);
  useEffect(() => {
    if (router.isReady) {
      getFilterBook({
        genres: router.query?.genre ? router.query?.genre : '',
        publishers: '',
        price: '',
        order_by: '',
        page: page,
      });
    }
  }, [getFilterBook, router, page]);
  useEffect(() => {
    if (router.isReady && router?.query?.genre) {
      setGenreList([Number(router.query?.genre as any)] || []);
    }
  }, [router]);
  return (
    <ProductLayout>
      <Paper
        sx={{
          backgroundColor: '#fff',
          px: { xs: 1.5, md: 2 },
          py: { xs: 2, md: 2 },
          mb: { xs: 1, md: 2 },
        }}
        className="shadow"
      >
        <ProductTitle />
      </Paper>
      <Box
        className="shadow"
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          px: { xs: 1.5, md: 2 },
          pt: { xs: 1, md: 0.5 },
          pb: { xs: 1, md: 2 },
          mb: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            onClick={() => {
              handleToggleFilter();
            }}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <IconButton>
              <FilterAltIcon />
            </IconButton>
            <Typography>Bộ lọc</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {/* Render Products */}
          <DivStyled open={matches ? openFilter : true} theme={theme}>
            <ProductCardItems
              isLoading={isGetingListFilterBook}
              data={listBook || []}
              slideToShow={12}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1.5,
                mb: 2,
              }}
            >
              <Pagination
                className="shadow"
                sx={{ p: 2, borderRadius: '8px' }}
                variant="outlined"
                shape="rounded"
                color="primary"
                count={meta?.last_page || 0}
                page={page}
                onChange={(event, value) => {
                  setPage(value);
                }}
              />
            </Box>
          </DivStyled>
          <Drawer
            variant={matches ? 'persistent' : 'temporary'}
            anchor="right"
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            sx={{
              zIndex: 0,
              '& .MuiDrawer-paper': {
                mt: matches ? '25px' : '80px',
                borderRadius: matches ? '8px' : '0',
                maxWidth: matches ? drawerWidth : drawerWidth,
                height: matches ? 'auto' : '100%',
                position: matches ? 'relative' : 'inherit',
                display: 'flex',
                wordBreak: 'break-work',
                border: 'none',
                boxShadow:
                  'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
              },
            }}
          >
            <div style={{ position: 'relative' }}>
              <Box
                sx={{
                  marginTop: 0,
                  transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                  width: '100%',
                }}
              >
                <form onSubmit={handleSubmit}>
                  {' '}
                  <CardContent>
                    <Grid container display="flex">
                      <Grid item xs={12}>
                        <Box
                          onClick={() => {
                            handleToggleFilter();
                          }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            pb: 1,
                          }}
                        >
                          <IconButton sx={{ padding: '0 5px 0 0 ' }}>
                            <ArrowForwardIosRoundedIcon />
                          </IconButton>
                          <Typography>Đóng bộ lọc</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">Thể loại</Typography>
                        <FormControl>
                          <Grid display="flex" container>
                            {isGenreLoading ? (
                              <Grid item xs={12}>
                                <Box sx={{ display: 'flex', p: 2 }}>
                                  <CircularProgress size={20} />
                                </Box>
                              </Grid>
                            ) : (
                              genreData?.data?.map(
                                (genre: any, _index: number) => (
                                  <FormControlLabel
                                    key={_index}
                                    label={genre?.name}
                                    checked={
                                      !!genreList?.find(
                                        (item: number) => item === genre?.id
                                      )
                                    }
                                    onChange={() => {
                                      if (
                                        !!genreList?.find(
                                          (item: number) => item === genre?.id
                                        )
                                      ) {
                                        const newGenreList = genreList.filter(
                                          (item) => item !== genre?.id
                                        );
                                        setGenreList(newGenreList);
                                      } else {
                                        setGenreList((pre: number[]) => [
                                          ...pre,
                                          genre?.id,
                                        ]);
                                      }
                                    }}
                                    control={<Checkbox />}
                                  />
                                )
                              )
                            )}
                          </Grid>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">Nhà xuất bản</Typography>
                        <FormControl>
                          <Grid display="flex" container>
                            {isPublisherLoading ? (
                              <Grid item xs={12}>
                                <Box sx={{ display: 'flex', p: 2 }}>
                                  <CircularProgress size={20} />
                                </Box>
                              </Grid>
                            ) : (
                              publisherData?.data?.map(
                                (publisher: any, _index: number) => (
                                  <FormControlLabel
                                    key={_index}
                                    label={publisher?.name}
                                    checked={
                                      !!publisherList?.find(
                                        (item: number) => item === publisher?.id
                                      )
                                    }
                                    onChange={() => {
                                      if (
                                        !!publisherList?.find(
                                          (item: number) =>
                                            item === publisher?.id
                                        )
                                      ) {
                                        const newPublisherList =
                                          publisherList.filter(
                                            (item) => item !== publisher?.id
                                          );
                                        setPublisherList(newPublisherList);
                                      } else {
                                        setPublisherList((pre: number[]) => [
                                          ...pre,
                                          publisher?.id,
                                        ]);
                                      }
                                    }}
                                    control={<Checkbox />}
                                  />
                                )
                              )
                            )}
                          </Grid>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">Giá</Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setPrice(
                                (event.target as HTMLInputElement).value
                              );
                            }}
                            value={price}
                          >
                            <FormControlLabel
                              value="0,50000"
                              control={<Radio />}
                              label="0 &#x20AB; - 50.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="50000,100000"
                              control={<Radio />}
                              label="50.000 &#x20AB; - 100.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="100000,200000"
                              control={<Radio />}
                              label="100.000 &#x20AB; - 200.000 &#x20AB; "
                            />
                            <FormControlLabel
                              value="200000,1000000"
                              control={<Radio />}
                              label="Trên 200.000 &#x20AB; "
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <Button
                          type="submit"
                          color="info"
                          variant="contained"
                          sx={{ marginRight: 1 }}
                        >
                          Lọc
                        </Button>
                        <Button
                          color="info"
                          variant="outlined"
                          onClick={handleClearAllFilter}
                        >
                          Xóa Tất Cả Lọc
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Box>
            </div>
          </Drawer>
        </Box>
      </Box>
    </ProductLayout>
  );
};

export default Product;
