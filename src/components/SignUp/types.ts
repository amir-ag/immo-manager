export type SignUpProps = {
    handleSignUp: (state: State) => void;
};

type State = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
