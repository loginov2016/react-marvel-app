import { FC, ReactNode } from 'react';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage: FC = (): ReactNode => {

  return (
    <>
        <AppBanner/>
        <ComicsList/>
    </>
  )
}

export default ComicsPage;