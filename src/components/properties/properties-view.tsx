import React from 'react';
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { properties } from './dummy-properties';
import PropertyCard from './card/property-card';
import AddIcon from '@material-ui/icons/Add';
import { Search } from '@material-ui/icons';

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

const PropertiesView = ({ showHeader = true }: PropertiesViewProps) => {
    const cssClasses = useStyles();

    return (
        <Container>
            {showHeader && (
                <>
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
                                className={cssClasses.headerControls}
                                variant="contained"
                                color="primary"
                                endIcon={<AddIcon />}
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

export default PropertiesView;
