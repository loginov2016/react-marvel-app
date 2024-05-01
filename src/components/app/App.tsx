import { FC, ReactNode, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import { MainPage, ComicsPage, SingleComicPage } from '../pages';
import appStyles from './App.module.scss';

// Динамические импорты нельзя ставить выше статических импортов.
const Page404 = lazy( () => import('../pages/Page404') );


const App: FC = (): ReactNode => {
    
    return (
        <Router>
            <div className={appStyles.app}>
                <AppHeader/>
                <main className={appStyles.main}>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics">
                                <Route index           element={<ComicsPage/>}/>
                                <Route path=":comicId" element={<SingleComicPage/>}/>
                                <Route path="new"      element={<Page404/>}/>
                            </Route>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
    
}

export default App;


/* 

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/books">
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>

*/