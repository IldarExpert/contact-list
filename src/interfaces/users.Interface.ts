export interface GeoInterface {
    "lat": string;
    "lng": string;
}

export interface AddressInterface {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": GeoInterface;
}

export interface UserInterface {
    "id": number;
    "name": string;
    "username"?: string;
    "email": string;
    "address"?: AddressInterface;
}

export interface UserWithContactsInterface {
    "id": number;
    "name": string;
    "username": string;
    "email": string;
    "address": AddressInterface;
    "contacts": UserInterface[];
}