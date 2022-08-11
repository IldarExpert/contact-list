import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Inputs {
    "user-checkbox": boolean
    "user-email": string,
    "user-password": string,
}

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}