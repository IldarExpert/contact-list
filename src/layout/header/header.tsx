import styles from './header.module.scss';
import { HeaderProps } from './header.props';
import logo from '../logo.jpg';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
    return (
        <header
            className={`${className} ${styles.header}`}
            {...props}
        >
            <img className={styles.logo} src={logo} alt={'logo'}/>
        </header>
    );
};

export default Header;