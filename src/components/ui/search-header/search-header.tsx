import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from '@snekcode/mui-search-bar';

// TODO: Change to generic Component (even better to use a custom Hook --> integrate useState(searchResult))
export type SearchHeaderProps = {
    handleCreate: () => void;
    placeholderText?: string;
    originalData: { [key: string]: any }[];
    setSearchResult: Dispatch<SetStateAction<any>>;
    searchParams: string[];
    disableCreateButton?: boolean;
    wrapAtMd?: boolean;
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
    },
    searchIcon: {
        marginRight: 0,
    },
}));

/**
SearchHeader takes 'originalData' and 'searchParams' as props and outputs filtered data by using 'setSearchResult'.
You can then use searchResult in the parent component and pass it on to e.g. a table component

The parent component has to provide the following to SearchHeader:
- originalData: The raw initial data as an array of objects (currently not nested objects)
- setSearchResult: Track searchResult in the parent component and pass setSearchResult to SearchHeader
- searchParams: Pass searchParams (keys of object fields) to SearchHeader in an array e.g. ['firstName', 'lastName', 'address.city']
- handleCreate: Function which is called on click on the button
- placeholderText: Placeholder text of the search input
- disableCreateButton: Flag to disable create button
- wrapAtMd: Flag to wrap controls already at the 'md' breakpoint
 */
const SearchHeader = ({
    handleCreate,
    placeholderText,
    originalData,
    setSearchResult,
    searchParams,
    disableCreateButton,
    wrapAtMd,
}: SearchHeaderProps) => {
    const cssClasses = useStyles();
    const [searchValue, setSearchValue] = useState('');

    const requestSearch = (searchValue: string) => {
        let searchResult: {}[] = [];
        for (const row of originalData) {
            for (const fieldName of searchParams) {
                let fieldValue = '';

                if (fieldName.includes('.')) {
                    const fields = fieldName.split('.');
                    fieldValue = row[fields[0]][fields[1]];
                } else {
                    fieldValue = row[fieldName];
                }

                if (fieldValue?.toLowerCase()?.includes(searchValue.toLowerCase())) {
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
        <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
            className={cssClasses.root}
        >
            <Grid item xs={12} sm={wrapAtMd ? false : 8} md={wrapAtMd ? 8 : false}>
                <SearchBar
                    classes={{ searchIconButton: cssClasses.searchIcon }}
                    value={searchValue}
                    placeholder={placeholderText}
                    onChange={(searchValue) => requestSearch(searchValue)}
                    onCancelSearch={() => cancelSearch()}
                />
            </Grid>
            <Grid item xs={12} sm={wrapAtMd ? false : 3} md={wrapAtMd ? 3 : false}>
                <Button
                    onClick={() => handleCreate()}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    disabled={disableCreateButton}
                >
                    New
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchHeader;
