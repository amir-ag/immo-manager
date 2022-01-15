import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { usePageTitle } from '../../hooks/use-page-title.hook';

type ThemeProps = {
    iconBackgroundColor: string;
};

type HomeHeaderProps = ThemeProps & {
    icon: React.ReactNode;
    title: string;
};

const useStyles = makeStyles<Theme, ThemeProps>((theme) => ({
    root: {
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: ({ iconBackgroundColor }) => iconBackgroundColor,
    },
}));

export const HomeHeader = ({ iconBackgroundColor, icon, title }: HomeHeaderProps) => {
    const cssClasses = useStyles({ iconBackgroundColor });
    usePageTitle(title);

    return (
        <div className={cssClasses.root}>
            <Avatar className={cssClasses.avatar}>{icon}</Avatar>
            <Typography component={'h1'} variant={'h5'}>
                {title}
            </Typography>
        </div>
    );
};
