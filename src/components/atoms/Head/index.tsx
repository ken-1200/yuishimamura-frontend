import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogUrl: string;
  ogImage: string;
  ogImageHeight: string;
  ogImageWidth: string;
  ogSiteName: string;
};

const Head = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogType,
  ogUrl,
  ogImage,
  ogImageHeight,
  ogImageWidth,
  ogSiteName,
}: Props) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:site_name" content={ogSiteName} />
    </Helmet>
  );
};

export default Head;
