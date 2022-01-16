import React, { FormEvent, useState } from 'react';
import { Button, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import { selectAllProperties } from '../../store/selectors';
import { PropertyModel } from '../property/model/property.model';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { IntroHeader } from '../ui/intro-header/intro-header';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import { InfoBox } from '../ui/info-box/info-box';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import { gridSpacingSmall } from '../../theming/theming-constants';
import { getDisplayNameOfProperty } from '../property/service/property.service';
import { emptyRentScheduleForm, RentScheduleFormModel } from './model/rent-schedule-form.model';
import { useForms } from '../../hooks/use-forms.hook';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        maxWidth: '750px',
        margin: '0 auto',
    },
    buttonIcon: {
        marginLeft: theme.spacing(1),
    },
}));

export const RentSchedule = () => {
    const cssClasses = useStyles();
    const [rentScheduleForm, setRentScheduleForm] = useState(emptyRentScheduleForm);

    const history = useHistory();
    const properties = useAppSelector(selectAllProperties);

    const submitFunc = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        history.push(routes.getRentScheduleDataRouteById(rentScheduleForm.propertyId));
    };

    const { handleBasicInputChange, handleSubmit } = useForms<RentScheduleFormModel>(
        setRentScheduleForm,
        rentScheduleForm,
        submitFunc
    );

    return (
        <>
            <IntroHeader title="Rent Schedule" subtitle="Generate a rent schedule for a specific property." />

            {properties?.length ? (
                <Grid
                    container
                    spacing={gridSpacingSmall}
                    component={'form'}
                    onSubmit={handleSubmit}
                    className={cssClasses.formContainer}
                >
                    <Grid item xs={1}>
                        <LooksOneIcon color="secondary" fontSize="large" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant={'subtitle1'}>
                            Choose the property you want to generate a report for
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={rentScheduleForm.propertyId}
                            onChange={(e) => handleBasicInputChange(e, 'propertyId')}
                            variant={'outlined'}
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
                                <MenuItem key={property.id} value={property.id}>
                                    {getDisplayNameOfProperty(property)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={1}>
                        <LooksTwoIcon color="secondary" fontSize="large" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant={'subtitle1'}>Click the button to generate the report</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color={'secondary'} type="submit" fullWidth variant="contained">
                            Generate Report
                            <EventNoteOutlinedIcon className={cssClasses.buttonIcon} />
                        </Button>
                    </Grid>
                </Grid>
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
