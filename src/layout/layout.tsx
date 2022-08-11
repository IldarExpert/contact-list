import { FunctionComponent } from 'react';
import Header from './header/header';
import styles from './layout.module.scss';
import { LayoutProps } from './layout.props';

const Layout = ({children}: LayoutProps): JSX.Element => {
    return (
        <div className={styles.layout}>
            <Header className={styles.header}/>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};