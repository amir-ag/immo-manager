import React, { useState } from 'react';
import { Button, Grid, Link, TextField, useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import { gridSpacingSmall } from '../../../theming/theming-constants';
import { emailPattern, minPasswordLength, passwordLengthHint } from '../../../constants';
import { emptySignUp, SignUpModel } from './model/sign-up.model';
import { useForms } from '../../../hooks/use-forms.hook';

export type SignUpProps = {
    handleSignUp: (state: SignUpModel) => void;
};

const SignUp = ({ handleSignUp }: SignUpProps) => {
    const theme = useTheme();
    const [signUpFormState, setSignUpFormState] = useState(emptySignUp);

    const submitFunc = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignUp(signUpFormState);
    };

    const { handleBasicInputChange, handleSubmit } = useForms<SignUpModel>(
        setSignUpFormState,
        signUpFormState,
        submitFunc
    );

    return (
        <>
            <HomeHeader
                iconBackgroundColor={theme.palette.primary.main}
                icon={<LockOutlinedIcon />}
                title="Sign up"
            />
            <Grid container spacing={gridSpacingSmall} component={'form'} onSubmit={handleSubmit}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={signUpFormState.firstName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'firstName'}
                        label={'Firstname'}
                        name={'firstname'}
                        autoComplete={'firstname'}
                        autoFocus
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={signUpFormState.lastName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastname'}
                        autoComplete={'lastname'}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={signUpFormState.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        inputProps={{ pattern: emailPattern }}
                        autoComplete={'email'}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={signUpFormState.password}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'password'}
                        type={'password'}
                        label={'Password'}
                        name={'password'}
                        autoComplete={'password'}
                        inputProps={{ minLength: minPasswordLength }}
                        helperText={passwordLengthHint}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color={'primary'} type="submit" fullWidth variant="contained">
                        Submit
                    </Button>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={routes.HOME} variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default SignUp;
