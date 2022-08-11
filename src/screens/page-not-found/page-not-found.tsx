import { Link } from 'react-router-dom';
import { AppRoute } from '../../config/consts';
import { withLayout } from '../../layout/layout';
import styles from './page-not-found.module.scss';
import { PageNotFoundProps } from './page-not-found.props';

const PageNotFound = ({}: PageNotFoundProps): JSX.Element => {
    return (
        <div className={styles.pageNotFound}>
            Page not found. Please, go to&nbsp;<Link to={AppRoute.SignIn}>Login</Link>&nbsp;page
        </div>
    );
};

export default withLayout(PageNotFound);