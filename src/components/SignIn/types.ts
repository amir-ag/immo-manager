export type SignInProps = {
    handleSignIn: (state: SignInState) => void,
}

type SignInState = {
    email: string,
    password: string
}
