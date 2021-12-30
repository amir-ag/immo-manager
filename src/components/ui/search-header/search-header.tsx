import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';
import SearchBar from '@snekcode/mui-search-bar';

export type SearchHeaderProps = {
    handleCreate: () => void;
    title?: string;
    originalData: { [key: string]: any }[];
    setSearchResult: Dispatch<SetStateAction<any>>;
    searchParams: string[];
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

/*

SearchHeader takes originalData and searchParams as props and outputs filtered data by using setSearchResult.
You can then use searchResult in the parent component and pass it on to e.g. a table component

The parent component has to provide the following to SearchHeader:

- originalData: the raw initial data as an array of objects (currently not netsted objects)
- setSearchResult: track searchResult in the parent component and pass setSearchResult to SearchHeader
- searchParams: pass searchParams (keys of object) to SearchHeader in an array e.g. ['firstName', 'lastName']
- handleCreate: function which is called on click on the button
- title: title of this component

 */

const SearchHeader = ({
    handleCreate,
    title = 'Placeholder Title',
    originalData,
    setSearchResult,
    searchParams,
}: SearchHeaderProps) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');

    const requestSearch = (searchValue: string) => {
        let searchResult: {}[] = [];
        for (let row of originalData) {
            for (let key of searchParams) {
                if (row[key].toLowerCase().includes(searchValue.toLowerCase())) {
                    searchResult.push(row);
                    break;
                }
            }
        }
        setSearchResult(searchResult);
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
