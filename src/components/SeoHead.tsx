import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_DATA } from '../data/site';
import { SITE_IMAGES } from '../data/images';

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
}

export const SeoHead: FC<SeoHeadProps> = ({
  title,
  description,
  path = '',
  ogType = 'website',
}) => {
  const fullTitle = `${title} | ${SITE_DATA.business.legalName} · Mohali`;
  const canonicalUrl = `https://door-world.vercel.app${path}`;
  const ogImageUrl = `https://door-world.vercel.app${SITE_IMAGES.brand.ogImage}`;

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_DATA.business.legalName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};
