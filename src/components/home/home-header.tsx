import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

type ThemeProps = {
    iconBackgroundColor: string;
};

type HomeHeaderProps = ThemeProps & {
    icon: React.ReactNode;
    title: string;
};

const useStyles = makeStyles<Theme, ThemeProps>((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: ({ iconBackgroundColor }) => iconBackgroundColor,
    },
}));

export const HomeHeader = ({ iconBackgroundColor, icon, title }: HomeHeaderProps) => {
    const cssClasses = useStyles({ iconBackgroundColor });

    return (
        <>
            <Avatar className={cssClasses.avatar}>{icon}</Avatar>
            <Typography component={'h1'} variant={'h5'}>
                {title}
            </Typography>
        </>
    );
};
