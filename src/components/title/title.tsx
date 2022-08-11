import styles from './title.module.scss';
import { TitleProps } from './title.props';

const Title = ({text}: TitleProps): JSX.Element => {
    return (
        <p className={styles.title}>{text}</p>
    );
};

export default Title;