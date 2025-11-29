import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({ 
  title = 'UpSpace - Technology, Business & Innovation',
  description = 'Your source for the latest in technology, business insights, and innovation.',
  image = '/images/og-image.jpg',
  article = false 
}) => {
  const router = useRouter();
  const siteURL = 'https://upspace.com'; // Replace with your actual domain
  const canonicalURL = `${siteURL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalURL} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:image" content={`${siteURL}${image}`} />
      <meta property="og:site_name" content="UpSpace" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteURL}${image}`} />

      {/* Additional */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
};

export default SEO;