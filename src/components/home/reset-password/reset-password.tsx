import React, { useState } from 'react';
import { Button, Grid, Link, TextField, useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import SettingsBackupRestoreOutlinedIcon from '@material-ui/icons/SettingsBackupRestoreOutlined';
import { emailPattern } from '../../../constants';
import { emptyResetPw, ResetPwModel } from './model/reset-password.model';
import { useForms } from '../../../hooks/use-forms.hook';
import { gridSpacingSmall } from '../../../theme/shared-styles';

export type ResetPasswordProps = {
    handleReset: (resetPwData: ResetPwModel) => void;
};

const ResetPassword = ({ handleReset }: ResetPasswordProps) => {
    const theme = useTheme();
    const [resetPwForm, setResetPwForm] = useState(emptyResetPw);

    const submitFunc = (e: React.FormEvent) => {
        e.preventDefault();
        handleReset(resetPwForm);
    };

    const { handleBasicInputChange, handleSubmit } = useForms<ResetPwModel>(
        setResetPwForm,
        resetPwForm,
        submitFunc
    );

    return (
        <>
            <HomeHeader
                iconBackgroundColor={theme.palette.primary.main}
                icon={<SettingsBackupRestoreOutlinedIcon />}
                title="Reset Password"
            />
            <Grid container spacing={gridSpacingSmall} component={'form'} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <TextField
                        value={resetPwForm.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'email'}
                        label={'Email Address'}
                        name={'email'}
                        type={'email'}
                        inputProps={{ pattern: emailPattern }}
                        autoComplete={'email'}
                        autoFocus
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}>
                        Send me a reset password email
                    </Button>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={routes.HOME} variant={'body2'}>
                        Back
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default ResetPassword;
