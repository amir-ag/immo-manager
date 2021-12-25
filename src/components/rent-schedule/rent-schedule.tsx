import React, { useState } from 'react';
import { Button, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import { useAppSelector } from '../../store/hooks';
import { selectProperties } from '../../store/selectors';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    },
    form: {
        maxWidth: '600px',
    },
    typography: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
    icon: {
        marginLeft: theme.spacing(1),
    },
}));

export const RentSchedule = () => {
    const cssClasses = useStyles();
    const [state, setState] = useState('');
    const properties = useAppSelector(selectProperties);

    return (
        <>
            <Typography variant={'h5'} className={cssClasses.title}>
                Rent Schedule
            </Typography>
            <form className={cssClasses.form}>
                <Typography variant={'h6'} className={cssClasses.typography}>
                    1) Choose the property you want to generate a report for
                </Typography>
                <TextField
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    variant={'outlined'}
                    margin={'normal'}
                    fullWidth
                    id={'property'}
                    label={'select a property..'}
                    select
                    name={'property'}
                    autoComplete={'property'}
                    autoFocus
                    type={'string'}
                    required
                >
                    {properties.map((property: { name: string }) => (
                        <MenuItem key={property.name} value={property.name}>
                            {property.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant={'h6'} className={cssClasses.typography}>
                    2) Click the button to generate the report
                </Typography>
                <Button color={'primary'} type="submit" fullWidth variant="contained">
                    Generate Report
                    <EventNoteOutlinedIcon className={cssClasses.icon} />
                </Button>
            </form>
        </>
    );
};
