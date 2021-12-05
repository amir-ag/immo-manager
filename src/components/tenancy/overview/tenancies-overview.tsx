import React from 'react';
import {
    Button,
    Grid,
    InputAdornment,
    makeStyles,
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
import { dummyTenancies } from '../dummy-tenancies';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
}));

export const TenanciesOverview = () => {
    const cssClasses = useStyles();

    return (
        <>
            {/* TODO: Check if it makes sense to extract search header (input + button) */}
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
                {/* TODO: Check if it makes sense to extract table as component */}
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
                                        {t.beginOfContract ? format(t.beginOfContract, 'dd.MM.yyyy') : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {t.endOfContract ? format(t.endOfContract, 'dd.MM.yyyy') : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};
