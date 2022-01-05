import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

type IntroHeaderProps = {
    title: string;
    subtitle: string;
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(6),
        marginRight: -theme.spacing(3),
        marginLeft: -theme.spacing(3),
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.secondary.light,
    },
    subtitle: {
        fontStyle: 'italic',
    },
}));

export const IntroHeader = ({ title, subtitle }: IntroHeaderProps) => {
    const cssClasses = useStyles();

    return (
        <Paper elevation={5} square={true} className={cssClasses.root}>
            <Typography variant={'h4'} component={'h1'}>
                {title}
            </Typography>
            <Typography variant={'h6'} component={'h2'} className={cssClasses.subtitle} color="textSecondary">
                {subtitle}
            </Typography>
        </Paper>
    );
};
