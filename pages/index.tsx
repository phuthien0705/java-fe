import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Container, useTheme } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HomeLayout from '@/layout/HomeLayout';
import ProductCardItems from '../components/cards/products/ProductCardItems';
import CarouselCustumized from '@/components/carousel/CarouselCustumized';
import ProductCardItemsByGenre from '@/components/cards/products/ProductCartItemsByGenre';
import useGetTopSelling from '@/hooks/book/useGetTopSelling';
import useGetListGenreClient from '../hooks/genre/useGetListGenreClient';
import { getHostName } from '@/utils/getHostName';

const Home = () => {
  const { data: topSelling, isLoading: isTopSellLoading } = useGetTopSelling();
  const { data: genreData, isLoading: isGenreLoading } = useGetListGenreClient(
    !!topSelling
  );
  const theme = useTheme();
  const hostname = getHostName();
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'page.home.head.title' });
  const description = intl.formatMessage({
    id: 'page.home.head.meta.description',
  });

  const renderGenres = () => {
    if (!isGenreLoading) {
      return (
        genreData &&
        genreData?.datas?.slice(0, 3)?.map((genre: any) => {
          return (
            <ProductCardItemsByGenre
              key={genre?.id}
              slideToShow={5}
              title={genre?.name}
              titleBackground={'#e8d5f9'}
              genreId={genre?.id}
            />
          );
        })
      );
    }
    return null;
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="google-site-verification"
          content="T4W53qmsgsIaln51YBOjITMRI_uwkzJXu7ceWwsm470"
        />
        <link rel="alternate" href={`${hostname}`} hrefLang="x-default" />
        <link rel="alternate" href={`${hostname}`} hrefLang="vi" />
        <link rel="alternate" href={`${hostname}/en`} hrefLang="en" />
        <link
          rel="alternate"
          href="http://example.com/nl-NL"
          hrefLang="nl-NL"
        />
      </Head>
      <HomeLayout>
        <Container
          maxWidth="lg"
          sx={{
            display: { xs: 'none', sm: 'block' },

            pt: theme.spacing(2),
            pb: theme.spacing(1),
            px: {
              xs: '8px !important',
              sm: '8px !important',
              md: '16px !important',
            },
          }}
        >
          <CarouselCustumized />
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: theme.spacing(1), md: theme.spacing(2) },
            pb: theme.spacing(1),
            mb: { xs: theme.spacing(2), md: theme.spacing(4) },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: theme.spacing(2),
              paddingTop: theme.spacing(1),
              section: {
                borderRadius: '8px !important',
                overflow: 'hidden !important',
              },
            }}
          >
            <ProductCardItems
              slideToShow={4}
              isLoading={isTopSellLoading}
              data={topSelling?.datas}
              title={<p>{<FormattedMessage id="page.home.topselling" />}</p>}
              titleIcon={<LocalFireDepartmentIcon color="error" />}
              titleBackground="#FCDDEF"
            />

            {renderGenres()}
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default Home;
