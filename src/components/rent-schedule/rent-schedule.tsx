import React, { FormEvent, useState } from 'react';
import { Button, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import { selectProperties } from '../../store/selectors';
import { PropertyModel } from '../property/model/property.model';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';
import { useAppSelector } from '../../hooks/store.hooks';

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
    const [property, setProperty] = useState('');

    const history = useHistory();
    const properties = useAppSelector(selectProperties);

    const renderTable = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        history.push(`rent-schedule/${property}`);
    };

    return (
        <>
            <Typography variant={'h5'} className={cssClasses.title}>
                Rent Schedule
            </Typography>

            {properties.length > 0 ? (
                <form className={cssClasses.form} onSubmit={renderTable}>
                    <Typography variant={'h6'} className={cssClasses.typography}>
                        1) Choose the property you want to generate a report for
                    </Typography>
                    <TextField
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
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
                        {properties.map((property: PropertyModel) => (
                            <MenuItem key={property.name} value={property.id}>
                                {`${property.name} - ${property.id}`}
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
            ) : (
                <Typography variant={'h5'}>
                    Currently you don't have any properties.{' '}
                    <NavLink to={routes.PROPERTIES_OVERVIEW}>Start by creating one!</NavLink>
                </Typography>
            )}
        </>
    );
};
