import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';

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
        setSnapshot(formModelState);
        submitFunc(e);
    };

    // --- Additional members ---
    const [snapshot, setSnapshot] = useState(formModelState);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        console.log(snapshot);
        console.log(formModelState);
        const iseq = isEqual(snapshot, formModelState);
        console.log(iseq);

        setIsFormDirty(!iseq);
    }, [snapshot, formModelState]);

    return {
        handleBasicInputChange,
        handleAddressInputChange,
        handleAutocompleteChange,
        handleThumbnailChange,
        handleSubmit,
        isFormDirty,
    };
};
