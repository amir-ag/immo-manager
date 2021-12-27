import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

type DeletePromptProps = {
    open: boolean;
    title: string;
    description: string;
    handleClose: () => void;
    handleDeletion: () => void;
};

const DeletePrompt = ({ open, title, description, handleClose, handleDeletion }: DeletePromptProps) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        handleDeletion();
                        handleClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePrompt;
