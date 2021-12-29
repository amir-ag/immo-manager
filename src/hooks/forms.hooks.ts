import React, { Dispatch, FormEvent, SetStateAction } from 'react';

export const useForms = <T>(
    setFormModelState: Dispatch<SetStateAction<T>>,
    formModelState: T,
    // TODO: Get rid of any here
    submitFunc: (e: FormEvent<any>) => void
) => {
    // --- Change handlers ---
    const handleBasicInputChange = (
        // TODO: Get rid of any here
        e: React.ChangeEvent<any>,
        fieldName?: string,
        isCheckbox = false
    ) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName ? fieldName : e.target.id]: isCheckbox ? e.target.checked : e.target.value,
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

    // TODO: Get rid of any here
    const handleAutocompleteChange = (event: any, value: { id: string } | null, fieldName: string) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName]: value ? value.id : '',
        }));
    };

    const handleThumbnailChange = (image: File) => {
        setFormModelState((prevState) => ({
            ...prevState,
            thumbnail: {
                // TODO: Check if there is a better approach
                ...(prevState as any)?.thumbnail,
                image,
            },
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
        handleThumbnailChange,
        handleSubmit,
        isFormDirty,
    };
};
