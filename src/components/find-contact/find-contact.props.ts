import { SetStateAction, Dispatch } from 'react';
import { UserInterface, UserWithContactsInterface } from '../../interfaces/users.Interface';

export interface FindContactProps {
    setFilteredUserContacts:  Dispatch<SetStateAction<UserInterface[]>>;
    userInfo: UserWithContactsInterface;
}