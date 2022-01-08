import React, { FormEvent, useState } from 'react';
import { Button, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import { selectProperties } from '../../store/selectors';
import { PropertyModel } from '../property/model/property.model';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';
import { IntroHeader } from '../ui/intro-header/intro-header';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';

const useStyles = makeStyles((theme) => ({
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
    const [propertyId, setPropertyId] = useState('');

    const history = useHistory();
    // TODO: Use form hook
    const properties = useAppSelector(selectProperties);

    const renderTable = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        history.push(routes.getRentScheduleDataRouteById(propertyId));
    };

    return (
        <>
            <IntroHeader title="Rent Schedule" subtitle="Generate a rent schedule for a specific property." />

            {properties?.length ? (
                <form className={cssClasses.form} onSubmit={renderTable}>
                    <Typography variant={'h6'} className={cssClasses.typography}>
                        1) Choose the property you want to generate a report for
                    </Typography>
                    <TextField
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'property'}
                        label={'Select a property'}
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
