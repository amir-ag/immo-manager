import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { selectSnackbar } from '../../store/selectors';
import { setSnackbar } from '../../store/slices/snackbar.slice';

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

export default function CustomizedSnackbar() {
    const classes = useStyles();
    const { snackbarOpen, snackbarType, snackbarMessage } = useAppSelector(selectSnackbar);
    const dispatch = useAppDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackbar({ snackbarOpen: false, snackbarType, snackbarMessage }));
    };

    return (
        <div className={classes.root}>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant={'filled'} onClose={handleClose} severity={'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
