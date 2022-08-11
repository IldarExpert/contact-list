import styles from './button.module.scss';
import { ButtonProps } from './button.props';

const Button = ({children, disabled, color, ...rest}: ButtonProps): JSX.Element => {
    return (
        <button
            className={`
                        ${styles.button} 
                        ${disabled? styles.disabled: ''}
                        ${color === 'red'? styles.red: ''}
                        `}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;