import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Backdrop, CircularProgress, ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from 'react-query/devtools';
import Script from 'next/script';
import { Provider } from 'react-redux';
import config from '../config';
import themes from '../themes';
import { store } from '../store';
import initRequest from '../services/initRequest';
import { AppPropsWithLayout } from '@/interfaces/layout.interface';
import * as gtag from '../lib/gtag';
import SocketsProvider from '@/socket/socket-context';
import vi from '../lang/vi.json';
import en from '../lang/en.json';
import { IntlProvider } from 'react-intl';

initRequest();

interface IMainContext {
  backdrop: boolean;
  setBackdrop: Dispatch<SetStateAction<boolean>>;
}
const defaultMainContextValue: IMainContext = {
  backdrop: false,
  setBackdrop: () => undefined,
};

export const MainContext = createContext<IMainContext>(defaultMainContextValue);

const messages = {
  vi,
  en,
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const customization = {
    fontFamily: config?.fontFamily,
    borderRadius: config?.borderRadius,
  };
  const router = useRouter();
  const { locale, defaultLocale } = router;

  const [backdrop, setBackdrop] = useState<boolean>(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>BOXO shop | Nhà sách online</title>
        <meta
          name="description"
          content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
        />
        <meta
          property="og:description"
          content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JHCL42N0Q5"
      />
          
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JHCL42N0Q5', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID ?? ''}>
        <IntlProvider
          locale={locale ?? 'vi'}
          defaultLocale={defaultLocale}
          messages={
            messages[(locale as unknown as keyof typeof messages) ?? 'vi']
          }
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={themes(customization)}>
                <MainContext.Provider value={{ backdrop, setBackdrop }}>
                  <SocketsProvider>
                    <Component {...pageProps} />
                  </SocketsProvider>
                </MainContext.Provider>
                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.modal + 1,
                  }}
                  open={backdrop}
                  onClick={() => setBackdrop((p) => !p)}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <ReactQueryDevtools initialIsOpen={false} />
              </ThemeProvider>
            </QueryClientProvider>
          </Provider>
        </IntlProvider>
      </GoogleOAuthProvider>
    </>
  );
}
export default MyApp;
