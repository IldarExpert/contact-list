import Contact from '../contact/contact';
import styles from './contact-list.module.scss';
import { ContactListProps } from './contact-list.props';

const ContactList = ({filteredUserContacts}: ContactListProps): JSX.Element => {
    return (
        <ul className={styles.list}>
            {
                filteredUserContacts.length > 0
                    ? filteredUserContacts.map((contact) => (
                        <Contact key={contact.id} contact={contact}/>
                    ))
                    : <p className={styles.empty}>контактов не найдено.</p>
            }
        </ul>
    );
};

export default ContactList;