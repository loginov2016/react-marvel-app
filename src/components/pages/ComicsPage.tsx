import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

export const ComicsPage: FC = (): ReactNode => {

  return (
    <>
      <Helmet>
        <meta name="description"
        content="Page with list of our comics"
        />
        <title>Comics Page</title>
      </Helmet>
      <AppBanner/>
      <ComicsList/>
    </>
  )
}