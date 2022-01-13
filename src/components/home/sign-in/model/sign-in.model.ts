export type SignInModel = {
    email: string;
    password: string;
};

export const emptySignIn: SignInModel = {
    email: '',
    password: '',
};
