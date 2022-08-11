import { AuthStatus } from '../../config/consts';
import { LoadingStatus } from '../../store/user-slice/user-slice.interface';

export interface PrivateRouteProps {
    children: JSX.Element;
    authStatus: AuthStatus;
    // isLoading: LoadingStatus
}