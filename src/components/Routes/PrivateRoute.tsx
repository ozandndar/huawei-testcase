import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../../redux/store';

import Layout from '../Layouts/Layout';


const PrivateRoute = ({ component, ...rest }: any) => {

    const auth = useSelector((state : RootState) => state.auth);

    let isAuthenticated : Boolean = auth.isAuthenticated;

    const routeComponent = (props: any) => (
        isAuthenticated
            ? <Layout>{React.createElement(component, props)}</Layout>
            : <Redirect to={{ pathname: '/login' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;