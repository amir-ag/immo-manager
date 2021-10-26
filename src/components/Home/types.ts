export interface HomeProps {
    handleSignIn: (state: SignInState) => void;
    handleSignUp: (state: SignUpState) => void;
    // state: LoginCredentials,
    // onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
}

export type SignUpState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type SignInState = {
    email: string;
    password: string;
};
