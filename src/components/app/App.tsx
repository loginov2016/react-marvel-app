import { FC, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';
import appStyles from './App.module.scss';

const App: FC = (): ReactNode => {
    
    return (
        <Router>
            <div className={appStyles.app}>
                <AppHeader/>
                <main className={appStyles.main}>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                    
                </main>
            </div>
        </Router>
    )
    
}

export default App;