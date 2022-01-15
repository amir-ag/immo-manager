export type SignUpModel = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export const emptySignUp: SignUpModel = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
};
