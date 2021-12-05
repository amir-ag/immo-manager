import React from 'react';
import {
    Button,
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {
    getDisplayNameOfRentalUnit,
    rentalUnitfloorLevel,
    RentalUnitModel,
    rentalUnitType,
} from './model/rental-unit.model';
import { dummyTenancies } from '../tenancy/dummy-tenancies';
import { format } from 'date-fns';
import { stylingConstants, useSharedStyles } from '../../theme/shared-styles';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
}));

export const RentalUnitDetail = ({ rentalUnitProps }: { rentalUnitProps: RentalUnitModel }) => {
    const cssClasses = useStyles();
    const sharedCssClasses = useSharedStyles();

    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfRentalUnit(rentalUnitProps)}</Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>General Info</Typography>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                className={sharedCssClasses.nested6ColGridItemLeft}
                                variant={'outlined'}
                                id={'ewid'}
                                label={'EWID'}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                className={sharedCssClasses.nested6ColGridItemRight}
                                id={'type'}
                                select
                                label="Select"
                                helperText="Select a room type"
                                variant="outlined"
                            >
                                {rentalUnitType.map((rut, i) => (
                                    <MenuItem value={i}>{rut}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            fullWidth
                            id={'numberOfRooms'}
                            label={'Number of Rooms'}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            fullWidth
                            id={'surfaceInM2'}
                            label={'Surface in m2'}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* TODO: Check if it's possible to use an 'Autocomplete' component */}
                        <TextField
                            id={'floorLevel'}
                            select
                            label="Select"
                            helperText="Select a floor level"
                            variant="outlined"
                            fullWidth
                        >
                            {rentalUnitfloorLevel.map((rufl, i) => (
                                <MenuItem value={i}>{rufl}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <DetailViewFormActions />
                </Grid>

                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>Tenancies</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            id="textSearch"
                            variant="outlined"
                            fullWidth
                            label="Search for Person"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button fullWidth variant="contained" color="primary" endIcon={<AddIcon />}>
                            New
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={cssClasses.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tenant(s)</TableCell>
                                        <TableCell align="right">From</TableCell>
                                        <TableCell align="right">To</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dummyTenancies.map((t) => (
                                        <TableRow key={t.tenant}>
                                            <TableCell>{t.tenant}</TableCell>
                                            {/* TODO: Use data from firestore */}
                                            <TableCell align="right">
                                                {t.beginOfContract
                                                    ? format(t.beginOfContract, 'dd.MM.yyyy')
                                                    : '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {t.endOfContract
                                                    ? format(t.endOfContract, 'dd.MM.yyyy')
                                                    : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
