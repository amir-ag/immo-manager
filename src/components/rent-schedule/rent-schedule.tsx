import React, { FormEvent, useState } from 'react';
import { Button, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import { selectAllProperties } from '../../store/selectors';
import { PropertyModel } from '../property/model/property.model';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { IntroHeader } from '../ui/intro-header/intro-header';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import { InfoBox } from '../ui/info-box/info-box';

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
    // TODO: Use form hook
    const [propertyId, setPropertyId] = useState('');

    const history = useHistory();
    const properties = useAppSelector(selectAllProperties);

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
                <InfoBox
                    title="No Properties found!"
                    text="You currently don't have any properties. Start by creating one!"
                    buttonText="Create"
                    handleButtonClick={() => history.push(routes.PROPERTIES_CREATE)}
                />
            )}
        </>
    );
};
