import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../config/consts';
import { PrivateRouteProps } from './private-route.props';

const PrivateRoute = ({authStatus, children}: PrivateRouteProps): JSX.Element => {

    if (authStatus !== AuthStatus.Auth) {
        return <Navigate to={AppRoute.SignIn}/>
    }

    return children;
};

export default PrivateRoute;