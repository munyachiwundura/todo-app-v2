import Document, { Html, Head, Main, NextScript } from "next/document";
import SEO from "../components/seo";

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap"
          rel="stylesheet"
        />

        <meta
          name="description"
          content="The only to-do app you will ever need"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <SEO
        url={`https://overkilltodoapp.vercel.app`}
        openGraphType="website"
        schemaType="article"
        title="Overkill To-Do App"
        description="The only to-do app you will ever need"
        image={"https://overkilltodoapp.vercel.app/Todoappcover.png"}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
