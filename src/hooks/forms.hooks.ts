import React, { Dispatch, FormEvent, SetStateAction } from 'react';

export const useForms = <T>(
    setFormModelState: Dispatch<SetStateAction<T>>,
    formModelState: T,
    submitFunc: (e: FormEvent<any>) => void
) => {
    // --- Change handlers ---
    const handleBasicInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        fieldName?: string
    ) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName ? fieldName : e.target.id]: e.target.value,
        }));
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormModelState((prevState) => ({
            ...prevState,
            address: {
                // TODO: Check if there is a better approach
                ...(prevState as any)?.address,
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
        // TODO: Set model snapshot
        submitFunc(e);
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
