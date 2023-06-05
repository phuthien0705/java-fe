import Head from 'next/head';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProductLayout from '@/layout/ProductLayot';
import useGetListPost from '@/hooks/post/useGetListPost';
import { newTimeStamp } from '@/common/timestamp';
import { useRouter } from 'next/router';
import { EPathName } from '@/constants/pathname';

const DescriptionDiv = styled('div')(`
  img {
    display: none;
  }
`);

function LoadingStack() {
  const theme = useTheme();
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      padding={theme.spacing(2)}
    >
      <CircularProgress />
    </Stack>
  );
}

export default function blogs() {
  const {
    queryReturn: { data, isLoading },
    page,
    setPage,
  } = useGetListPost();
  const theme = useTheme();
  const router = useRouter();

  function handleRedirectToBlogDetail(bid: string) {
    router.push({
      pathname: EPathName.BLOG_DETAIL,
      query: {
        bid,
      },
    });
  }

  return (
    <>
      <Head>
        <title>Bài viết</title>
      </Head>
      <ProductLayout>
        <Container maxWidth="sm" sx={{ paddingBottom: theme.spacing(3) }}>
          {isLoading && <LoadingStack />}
          <Stack spacing={theme.spacing(2)}>
            {data?.datas &&
              data.datas.map((item) => {
                return (
                  <Stack key={item._id} spacing={theme.spacing(1)}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '24px',
                        color: '#000',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      className="line-clamp-2"
                      onClick={() => handleRedirectToBlogDetail(item._id)}
                    >
                      {item.title}
                    </Typography>
                    <Stack direction={'row'} spacing={theme.spacing(2)}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={theme.spacing(1)}
                      >
                        <PersonIcon fontSize={'small'} />
                        <Typography fontSize={17}>
                          {item.author.name}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={theme.spacing(1)}
                      >
                        <AccessTimeIcon fontSize={'small'} />
                        <Typography fontSize={17}>
                          {newTimeStamp(item.createdAt)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <DescriptionDiv
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      className="line-clamp-3"
                    ></DescriptionDiv>
                  </Stack>
                );
              })}
          </Stack>
          {data && data?.totalPages > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: theme.spacing(1.5),
              }}
            >
              <Pagination
                className="shadow"
                sx={{ p: 2, borderRadius: '6px' }}
                variant="outlined"
                shape="rounded"
                color="primary"
                count={data?.totalPages ?? 0}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </Box>
          )}
        </Container>
      </ProductLayout>
    </>
  );
}
