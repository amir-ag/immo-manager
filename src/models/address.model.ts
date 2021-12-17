export type AddressModel = {
    addressLine1: string;
    addressLine2?: string;
    postCode: number | null;
    city: string;
};

export const emptyAddress = {
    addressLine1: '',
    addressLine2: '',
    postCode: null,
    city: '',
};
