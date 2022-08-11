import styles from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.props';

const Checkbox = ({checked, handleCheckBoxClick, text}: CheckboxProps): JSX.Element => {
    return (
        <label className={styles.checkboxWrapper}>
            <input
                type="checkbox"
                checked={checked}
                style={{display: 'none'}}
                onChange={handleCheckBoxClick}
            />
            <div className={styles.checkbox}>
                <div className={checked ? styles.checked : ''}/>
            </div>
            {text && <span>
                {text}
            </span>}
        </label>
    );
};

export default Checkbox;