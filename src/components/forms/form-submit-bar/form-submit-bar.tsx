import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useSharedStyles } from '../../../theming/theming-utils';

export const useStyles = makeStyles((theme) => ({
    outerContainer: {
        marginTop: theme.spacing(3),
    },
    hide: {
        display: 'none',
    },
}));

type FormSubmitBarProps = {
    disableCancel?: boolean;
    hideCancel?: boolean;
    handleCancel?: () => void;
    disableSubmit?: boolean;
    submitButtonText?: string;
};

const FormSubmitBar = ({
    disableCancel,
    hideCancel,
    handleCancel,
    disableSubmit,
    submitButtonText,
}: FormSubmitBarProps) => {
    const sharedCssClasses = useSharedStyles();
    const cssClasses = useStyles();

    return (
        <Grid item container xs={12} className={cssClasses.outerContainer}>
            <Grid item xs={12} md={6} className={hideCancel ? cssClasses.hide : ''}>
                <Button
                    className={sharedCssClasses.nested6ColGridItemLeft}
                    variant="contained"
                    color="default"
                    disabled={disableCancel}
                    onClick={handleCancel ? () => handleCancel() : () => {}}
                    startIcon={<CancelIcon />}
                >
                    Cancel
                </Button>
            </Grid>
            <Grid item xs={12} md={hideCancel ? 12 : 6}>
                <Button
                    className={sharedCssClasses.nested6ColGridItemRight}
                    variant="contained"
                    disabled={disableSubmit}
                    type="submit"
                    color="primary"
                    startIcon={<SaveIcon />}
                >
                    {submitButtonText ? submitButtonText : 'Save'}
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormSubmitBar;
