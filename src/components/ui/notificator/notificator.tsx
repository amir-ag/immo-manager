import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectNotificator } from '../../../store/selectors';
import { setNotificator } from '../../../store/slices/notificator.slice';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Notificator() {
    const cssClasses = useStyles();
    const { notificatorOpen, notificatorType, notificatorMessage } = useAppSelector(selectNotificator);
    const dispatch = useAppDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(
            setNotificator({
                notificatorOpen: false,
                notificatorType: undefined,
                notificatorMessage: '',
            })
        );
    };

    return (
        <div className={cssClasses.root}>
            <Snackbar open={notificatorOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant={'filled'} onClose={handleClose} severity={notificatorType}>
                    {notificatorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
