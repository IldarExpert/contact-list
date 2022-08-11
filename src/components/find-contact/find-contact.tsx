import { useEffect, useState } from 'react';
import Title from '../title/title';
import styles from './find-contact.module.scss';
import { FindContactProps } from './find-contact.props';

const FindContact = ({userInfo, setFilteredUserContacts}: FindContactProps): JSX.Element => {
    const [value, setValue] = useState('');

    const filterContacts = (text: string) => {
        const filteredData = userInfo.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(text) || contact.email.toLowerCase().includes(text);
        })
        setFilteredUserContacts(filteredData);
    }

    useEffect(() => {
        filterContacts(value.toLowerCase())
    }, [value])

    return (
        <>
            <Title text={'Поиск контакта'}/>
            <div className={styles.findContact}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={styles.input}
                />
            </div>
        </>
    );
};

export default FindContact;