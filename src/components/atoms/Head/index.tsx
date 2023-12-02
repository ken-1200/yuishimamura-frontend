import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
};

const Head = ({ title, description, keywords, ogTitle, ogDescription }: Props) => {
  const defaultDescription = '最新情報は、Instagramをチェック&フォローしてください。';
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description + defaultDescription} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription + defaultDescription} />
    </Helmet>
  );
};

export default Head;
