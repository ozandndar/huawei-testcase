import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../Layouts/Layout';


const PrivateRoute = ({ component, ...rest }: any) => {

    let isAuthenticated : Boolean = false;

    const routeComponent = (props: any) => (
        isAuthenticated
            ? <Layout>{React.createElement(component, props)}</Layout>
            : <Redirect to={{ pathname: '/login' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;