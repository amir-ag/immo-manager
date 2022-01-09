import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { NavLink } from 'react-router-dom';

type InfoBoxProps = {
    title: string;
    text: string;
    buttonText: string;
    buttonUrl: string;
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '85%',
        },
    },
}));

export const InfoBox = ({ title, text, buttonText, buttonUrl }: InfoBoxProps) => {
    const cssClasses = useStyles();

    return (
        <Alert
            className={cssClasses.root}
            severity="info"
            action={
                <Button color="inherit" size="small" component={NavLink} to={buttonUrl}>
                    {buttonText}
                </Button>
            }
        >
            <AlertTitle>{title}</AlertTitle>
            {text}
        </Alert>
    );
};
