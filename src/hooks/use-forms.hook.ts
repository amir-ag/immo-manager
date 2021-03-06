import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';

export const useForms = <T>(
    setFormModelState: Dispatch<SetStateAction<T>>,
    formModelState: T,
    submitFunc: (e: FormEvent<HTMLElement>) => void
) => {
    // --- Change handlers ---
    const handleBasicInputChange = (e: React.ChangeEvent<any>, fieldName?: string, isCheckbox = false) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName ? fieldName : e.target.id]: isCheckbox ? e.target.checked : e.target.value,
        }));
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormModelState((prevState) => ({
            ...prevState,
            address: {
                ...(prevState as any)?.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const handleAutocompleteChange = (value: { id: string } | null, fieldName: string) => {
        setFormModelState((prevState) => ({
            ...prevState,
            [fieldName]: value ? value.id : '',
        }));
    };

    const handleThumbnailChange = (image: File) => {
        // Dropzone control triggers event at initialization with 'image==undefined'
        if (!image) {
            return;
        }

        setFormModelState((prevState) => ({
            ...prevState,
            thumbnail: {
                ...(prevState as any)?.thumbnail,
                image,
            },
        }));
    };

    // --- Submit Handler ---
    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        setSnapshot(formModelState);
        submitFunc(e);
    };

    // --- Additional members ---
    const [snapshot, setSnapshot] = useState(formModelState);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        setIsFormDirty(!isEqual(snapshot, formModelState));
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
