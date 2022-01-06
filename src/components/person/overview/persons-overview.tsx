import React, { useEffect, useState } from 'react';
import PersonDialog from '../person-dialog';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hooks';
import { deletePerson } from '../../../store/slices/persons.slice';
import PersonsTable from './persons-table';
import { selectPersons } from '../../../store/selectors';
import { emptyPerson } from '../model/person.model';
import SearchHeader from '../../ui/search-header/search-header';
import { IntroHeader } from '../../ui/intro-header/intro-header';

const PersonsOverview = () => {
    const personsData = useAppSelector(selectPersons);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSearchResult(personsData);
    }, [personsData]);

    const [openDialog, setOpenDialog] = useState(false);
    const [searchResult, setSearchResult] = useState(personsData);
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
        const selectedPerson = personsData.filter((person) => person.id === id);
        const editPerson = selectedPerson[0];
        setCurrentPerson(editPerson);
        setOpenDialog(true);
    };

    return (
        <>
            <IntroHeader title="Manage Persons" subtitle="Search, create, edit, ... all persons." />
            <SearchHeader
                handleCreate={handleCreate}
                placeholderText={'Search by first name, last name, email or address'}
                originalData={personsData}
                setSearchResult={setSearchResult}
                searchParams={['firstName', 'lastName', 'email', 'address.addressLine1', 'address.city2']}
            />
            {personsData && (
                <PersonsTable
                    personsData={searchResult}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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
