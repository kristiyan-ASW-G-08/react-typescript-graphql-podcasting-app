import { FC } from 'react';
import Head from 'next/head';

interface HeadLayoutProps {
  title: string;
  description?: string;
  keywords?: string;
}

const HeadLayout: FC<HeadLayoutProps> = ({
  title,
  description = '',
  keywords = '',
}) => {
  return (
    <Head>
      <title data-testid="title">{title}</title>
      <meta
        data-testid="description"
        name="description"
        content={description}
      />
      <meta data-testid="keywords" name="keywords" content={keywords} />
    </Head>
  );
};

export default HeadLayout;
