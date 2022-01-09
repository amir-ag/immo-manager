import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

type InfoBoxProps = {
    title: string;
    text: string;
    noButton?: boolean;
    buttonText: string;
    handleButtonClick: () => void;
};

// TODO: Make a narrow and wide variant
const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '85%',
        },
    },
}));

export const InfoBox = ({ title, text, noButton, buttonText, handleButtonClick }: InfoBoxProps) => {
    const cssClasses = useStyles();

    return (
        <Alert
            className={cssClasses.root}
            severity="info"
            action={
                noButton ? undefined : (
                    <Button color="inherit" size="small" onClick={() => handleButtonClick()}>
                        {buttonText}
                    </Button>
                )
            }
        >
            <AlertTitle>{title}</AlertTitle>
            {text}
        </Alert>
    );
};
