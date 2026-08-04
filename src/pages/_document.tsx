import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentInitialProps } from 'next/document';

type AaronDocumentProps = DocumentInitialProps & {
  lang: string;
};

export default class AaronDocument extends Document<AaronDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<AaronDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const pathname = ctx.pathname ?? '/';
    const lang = pathname.startsWith('/en')
      ? 'en'
      : pathname.startsWith('/es')
        ? 'es'
        : pathname.startsWith('/nl')
          ? 'nl'
          : 'pt-BR';

    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <script
            id="theme-init"
            dangerouslySetInnerHTML={{
              __html:
                "(function(){try{var theme=localStorage.getItem('aarondzn-theme');if(theme==='light'||theme==='dark'){document.documentElement.dataset.theme=theme;}}catch(error){}})();"
            }}
          />
          <meta name="color-scheme" content="light dark" />
          <link rel="preload" as="image" href="/images/aaron-aznar-linkedin.png" />
          <link rel="dns-prefetch" href="https://www.linkedin.com" />
          <link rel="dns-prefetch" href="https://wa.me" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
