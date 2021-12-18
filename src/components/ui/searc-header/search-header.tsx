import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';
import SearchBar from '@snekcode/mui-search-bar';
import { PersonModel } from '../../persons/models/person.model';

export type SearchHeaderProps = {
    handleCreate: () => void;
    title?: string;
    originalData: PersonModel[];
    setsearchResult: Dispatch<SetStateAction<any>>;
};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
    },
    header: {
        flexGrow: 1,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: `1px solid ${grey[300]}`,
        padding: theme.spacing(2),
    },
    headerTop: {
        display: 'flex',
    },
}));

const SearchHeader = ({
    handleCreate,
    title = 'Placeholder Title',
    originalData,
    setsearchResult,
}: SearchHeaderProps) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');

    const requestSearch = (searchValue: string) => {
        const searchResult = originalData.filter(
            (row) =>
                row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.address.addressLine1.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.address.city.includes(searchValue.toLowerCase()) ||
                row.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setsearchResult(searchResult);
    };

    const cancelSearch = () => {
        setSearchValue('');
        requestSearch(searchValue);
    };

    return (
        <Paper elevation={0}>
            <Container className={classes.headerContainer} maxWidth="xl">
                <div className={classes.headerTop}>
                    <Typography variant={'h6'} className={classes.header}>
                        {title}
                    </Typography>
                    <Button
                        onClick={() => handleCreate()}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon />}
                    >
                        New
                    </Button>
                </div>
                <div>
                    <SearchBar
                        value={searchValue}
                        onChange={(searchValue) => requestSearch(searchValue)}
                        onCancelSearch={() => cancelSearch()}
                        style={{ justifyContent: 'normal', margin: '10px 0' }}
                    />
                </div>
            </Container>
        </Paper>
    );
};

export default SearchHeader;
