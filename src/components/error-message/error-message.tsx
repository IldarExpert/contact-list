import styles from './error-message.module.scss';
import { ErrorMessageProps } from './error-message.props';

const ErrorMessage = ({errorMessage}: ErrorMessageProps): JSX.Element => {
    return (
        <div className={styles.errorMessage}>
            <span className={styles.styledPic}>!</span>
            <span className={styles.errorText}>{errorMessage}</span>
        </div>
    );
};

export default ErrorMessage;