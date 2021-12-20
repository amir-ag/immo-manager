import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useSharedStyles } from '../../../theme/shared-styles';

export const useStyles = makeStyles((theme) => ({
    outerContainer: {
        marginTop: theme.spacing(3),
    },
}));

type DetailViewFormActionsProps = {
    disableCancel?: boolean;
    disableSave?: boolean;
    handleCancel: () => void;
};

const DetailViewFormActions = ({ disableCancel, disableSave, handleCancel }: DetailViewFormActionsProps) => {
    const sharedCssClasses = useSharedStyles();
    const cssClasses = useStyles();

    return (
        <Grid item container xs={12} className={cssClasses.outerContainer}>
            <Grid item xs={12} md={6}>
                <Button
                    className={sharedCssClasses.nested6ColGridItemLeft}
                    variant="contained"
                    color="default"
                    disabled={disableCancel}
                    onClick={() => handleCancel()}
                    startIcon={<CancelIcon />}
                >
                    Cancel
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    className={sharedCssClasses.nested6ColGridItemRight}
                    variant="contained"
                    disabled={disableSave}
                    type="submit"
                    color="primary"
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};

export default DetailViewFormActions;
