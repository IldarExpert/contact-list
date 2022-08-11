import { getToken } from '../helpers/token';
import { USER_1, USER_2 } from './consts';

export function getUserUrl () {
    const token = getToken();
    if (token === USER_1) return 1;
    if (token === USER_2) return 2;
    return 0;
}