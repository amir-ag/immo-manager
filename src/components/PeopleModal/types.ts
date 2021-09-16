import React, {Dispatch, FormEvent, SetStateAction} from "react";

type ModalState = {
    firstName: string,
    lastName: string,
    street: string,
    houseNumber: string,
    city: string,
    phone: string,
    role: string
}

export type PeopleModalProps = {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    handleSubmit: (e: FormEvent<HTMLElement>) => void,
    state: ModalState,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onChangeRole: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    roles: { value: string }[]
}
