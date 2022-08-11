import { useEffect, useState } from 'react';
import AddContactForm from '../../components/add-contact-form/add-contact-form';
import ContactList from '../../components/contact-list/contact-list';
import ErrorMessage from '../../components/error-message/error-message';
import FindContact from '../../components/find-contact/find-contact';
import Title from '../../components/title/title';
import { useFetchUserInfo } from '../../hooks/useFetchUserInfo';
import { UserInterface } from '../../interfaces/users.Interface';
import { withLayout } from '../../layout/layout';
import styles from './contacts.module.scss';
import { ContactsProps } from './contacts.props';

const Contacts = ({}: ContactsProps): JSX.Element => {
    const [userInfo, isLoading, error] = useFetchUserInfo();
    const [filteredUserContacts, setFilteredUserContacts] = useState<UserInterface[]>([]);

    useEffect(() => {
        if (userInfo) {
            setFilteredUserContacts(userInfo.contacts)
        }
    }, [userInfo])

    if (isLoading === 'pending' || userInfo === null) {
        return <h1 style={{position: 'absolute', left: '50%', top: '50%'}}>Loading...</h1>
    }

    return (
        <div className={styles.contacts}>
            {error && <ErrorMessage errorMessage={error.message}/>}
            <div>
                <FindContact userInfo={userInfo} setFilteredUserContacts={setFilteredUserContacts}/>
                <AddContactForm/>
            </div>
            <div>
                <Title text={`Список контактов пользователя ${userInfo.name}:`}/>
                <ContactList filteredUserContacts={filteredUserContacts}/>
            </div>
        </div>
    );
};

export default withLayout(Contacts);