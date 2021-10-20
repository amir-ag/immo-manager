import React, {Dispatch, FormEvent, SetStateAction} from "react";

type ModalState = {
    firstName: string,
    lastName: string,
    birthday?: Date | null,
    street: string,
    houseNumber: string,
    zip: number | null,
    city: string,
    email: string,
    mobilePhone: number | null,
    landline?: number | null,
    role: string,
    type: string
}

export type PeopleModalProps = {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    handleSubmit: (e: FormEvent<HTMLElement>) => void,
    state: ModalState,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onChangeRole: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onChangeType: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onChangeDate: (date: Date) => void,
    roles: { value: string }[]
}
