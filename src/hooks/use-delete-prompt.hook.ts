import { useState } from 'react';

export const useDeletePrompt = () => {
    const [deletePromptOpen, setDeletePromptOpen] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState('');

    const handleOpenDeletePrompt = (id: string) => {
        setEntityToDelete(id);
        setDeletePromptOpen(true);
    };

    const handleCancelDelete = () => {
        setDeletePromptOpen(false);
    };

    return {
        deletePromptOpen,
        entityToDelete,
        handleOpenDeletePrompt,
        handleCancelDelete,
    };
};
