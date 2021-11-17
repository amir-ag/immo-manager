/*
    TODOs:
    - Align and unify all ca. 5 used person models (modal, table, slice, etc...)
    - Use AddressModel
*/
export type PersonModel = {
    id: string;
    firstName: string;
    lastName: string;
    birthday?: string | null;
    street: string;
    houseNumber: string;
    zip: number | null;
    city: string;
    email: string;
    mobilePhone: number | null;
    landline?: number | null;
    role: string;
    type: string;
};
