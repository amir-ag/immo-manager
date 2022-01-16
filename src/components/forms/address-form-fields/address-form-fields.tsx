import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { AddressModel } from '../../../models/address.model';

type AddressFormFieldsProps = {
    addressState: AddressModel;
    handleAddressInputChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

/** Component needs to be embedded in a Grid container to have the correct layout. */
const AddressFormFields = ({ addressState, handleAddressInputChange }: AddressFormFieldsProps) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant={'subtitle2'} component={'h3'}>
                    Address
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'addressLine1'}
                    value={addressState?.addressLine1 ?? ''}
                    onChange={(e) => handleAddressInputChange(e)}
                    label={'Address Line 1'}
                    type="text"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    value={addressState?.addressLine2 ?? ''}
                    onChange={(e) => handleAddressInputChange(e)}
                    id={'addressLine2'}
                    label={'Address Line 2'}
                    type="text"
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'postCode'}
                    value={addressState?.postCode ?? ''}
                    onChange={(e) => handleAddressInputChange(e)}
                    label={'Post Code'}
                    inputProps={{ min: 1000, max: 9700 }}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    variant={'outlined'}
                    value={addressState?.city ?? ''}
                    onChange={(e) => handleAddressInputChange(e)}
                    fullWidth
                    id={'city'}
                    label={'City'}
                    type="text"
                    required
                />
            </Grid>
        </>
    );
};

export default AddressFormFields;
