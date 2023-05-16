import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charSet="UTF-8" />
          <meta
            name="google-site-verification"
            content="T4W53qmsgsIaln51YBOjITMRI_uwkzJXu7ceWwsm470"
          />
          <meta property="og:title" content="BOXO shop | Nhà sách online" />
          <meta name="title" content="BOXO shop | Nhà sách online" />
          <meta property="og:url" content="https://www.boxo.studio/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
