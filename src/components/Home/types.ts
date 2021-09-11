import React from "react";

export interface HomeProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    state: LoginCredentials,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
}

interface LoginCredentials {
    email: string,
    password: string
}
