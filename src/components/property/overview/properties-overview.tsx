import React, { useEffect } from 'react';
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import PropertyCard from './property-card';
import AddIcon from '@material-ui/icons/Add';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectProperties } from '../../../store/selectors';
import { getProperties } from '../../../store/slices/properties.slice';

const gridSpacing = 3;

const useStyles = makeStyles((theme) => ({
    headerControls: {
        width: '100%',
    },
    headerElements: {
        marginBottom: theme.spacing(4),
    },
}));

type PropertiesViewProps = {
    showHeader?: boolean;
};

const PropertiesOverview = ({ showHeader = true }: PropertiesViewProps) => {
    const cssClasses = useStyles();

    const dispatch = useAppDispatch();
    const properties = useAppSelector(selectProperties);

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch]);

    return (
        <Container>
            {showHeader && (
                <>
                    {/* TODO: Check if it makes sense to extract search header (input + button) as component */}
                    <Typography className={cssClasses.headerElements} variant={'h5'}>
                        Properties Overview
                    </Typography>
                    <Grid
                        container
                        className={cssClasses.headerElements}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={gridSpacing}
                    >
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="textSearch"
                                className={cssClasses.headerControls}
                                variant="outlined"
                                label="Search for street name, post code, city, ..."
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                component={Link}
                                to={routes.PROPERTIES_CREATE}
                                className={cssClasses.headerControls}
                                fullWidth
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}
                            >
                                New
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
            <Grid container spacing={gridSpacing}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                        <PropertyCard {...property} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PropertiesOverview;
