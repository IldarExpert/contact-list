import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import PrivateRoute from './components/private-route/private-route';
import { AppRoute } from './config/consts';
import Auth from './screens/auth/auth';
import Contacts from './screens/contacts/contacts';
import PageNotFound from './screens/page-not-found/page-not-found';
import { getAuthStatus } from './store/user-slice/user-slice.selectors';

function App() {
    const authStatus = useSelector(getAuthStatus);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.SignIn} element={<Auth/>}/>
                <Route path={AppRoute.Contacts} element={
                    <PrivateRoute authStatus={authStatus}>
                        <Contacts/>
                    </PrivateRoute>
                } />
                <Route path={'*'} element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
