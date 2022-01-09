import React, { useEffect, useState } from 'react';
import PersonDialog from '../person-dialog';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { deletePerson } from '../../../store/slices/persons.slice';
import PersonsTable from './persons-table';
import { selectAllPersons } from '../../../store/selectors';
import { emptyPerson } from '../model/person.model';
import SearchHeader from '../../ui/search-header/search-header';
import { IntroHeader } from '../../ui/intro-header/intro-header';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { getItemFromCollectionById } from '../../../services/collection-utils';
import { InfoBox } from '../../ui/info-box/info-box';

const PersonsOverview = () => {
    const allPersons = useAppSelector(selectAllPersons);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSearchResult(allPersons);
    }, [allPersons]);

    const [openDialog, setOpenDialog] = useState(false);
    const [searchResult, setSearchResult] = useState(allPersons);
    const [currentPerson, setCurrentPerson] = useState({
        ...emptyPerson,
    });

    const handleDelete = (id: string) => {
        dispatch(deletePerson(id));
    };

    const handleCreate = () => {
        setCurrentPerson(emptyPerson);
        setOpenDialog(true);
    };

    const handleEdit = (id: string) => {
        const personToEdit = getItemFromCollectionById(id, allPersons);
        if (personToEdit) {
            setCurrentPerson(personToEdit);
            setOpenDialog(true);
        }
    };

    return (
        <>
            <IntroHeader title="Manage Persons" subtitle="Search, create, edit, ... all persons." />
            <SearchHeader
                handleCreate={handleCreate}
                placeholderText={'Search by first name, last name, email or address'}
                originalData={allPersons}
                setSearchResult={setSearchResult}
                searchParams={['firstName', 'lastName', 'email', 'address.addressLine1', 'address.city2']}
            />
            {allPersons?.length ? (
                <PersonsTable
                    personsData={searchResult}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ) : (
                <InfoBox
                    title="No Persons found!"
                    text="You currently don't have any persons. Start by creating one!"
                    buttonText="Create"
                    handleButtonClick={() => handleCreate()}
                />
            )}
            {openDialog && (
                <PersonDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    currentPerson={currentPerson}
                    setCurrentPerson={setCurrentPerson}
                />
            )}
        </>
    );
};

export default PersonsOverview;
