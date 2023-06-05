import Head from 'next/head';
import { useRouter } from 'next/router';
import { CircularProgress, Container, Stack, useTheme } from '@mui/material';
import useGetPostDetail from '@/hooks/post/useGetPostDetail';
import ProductLayout from '@/layout/HomeLayout';

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

export default function BlogDetail() {
  const theme = useTheme();
  const router = useRouter();
  const { bid } = router.query;
  const {
    queryReturn: { data, isLoading },
  } = useGetPostDetail(bid);
  return (
    <>
      <Head>
        <title>{data?.title ?? 'Chi tiết bài viết'}</title>
      </Head>
      <ProductLayout>
        <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
          {isLoading && <LoadingStack />}
          <div dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}></div>
        </Container>
      </ProductLayout>
    </>
  );
}
