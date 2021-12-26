import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { AddressModel } from '../models/address.model';

// TODO: Create base model with address property
export const useForms = <T extends { address: AddressModel }>(
    setFormModelState: Dispatch<SetStateAction<T>>,
    formModelState: T,
    submitFunc: (e: FormEvent<any>) => void
) => {
    // --- Change handlers ---
    const handleBasicInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormModelState((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const handleAutocompleteChange = (event: any, value: { id: string } | null, fieldName: string) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName]: value ? value.id : '',
        }));
    };

    // --- Submit Handler ---
    const handleSubmit = (e: FormEvent<any>) => {
        submitFunc(e);
        // TODO: Set model snapshot
    };

    // --- Additional methods ---
    const isFormDirty = () => {
        // TODO: Compare current model to last model snapshot
        return true;
    };

    return {
        handleBasicInputChange,
        handleAddressInputChange,
        handleAutocompleteChange,
        handleSubmit,
        isFormDirty,
    };
};
