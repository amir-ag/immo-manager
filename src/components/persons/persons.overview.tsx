import React, { FormEvent, useEffect, useState } from 'react';
import PersonDialog from './dialog/person-dialog';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { createUpdatePerson, deletePerson } from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { selectPersons } from '../../store/selectors';
import { emptyPerson } from './models/person.model';
import SearchHeader from '../ui/search-header/search-header';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(4),
    },
}));

const PersonsOverview = () => {
    const cssClasses = useStyles();
    const personsData = useAppSelector(selectPersons);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSearchResult(personsData);
    }, [personsData]);

    const [openModal, setOpenModal] = useState(false);
    const [searchResult, setSearchResult] = useState(personsData);
    const [currentPerson, setCurrentPerson] = useState({
        ...emptyPerson,
    });

    // TODO: Reuse
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentPerson((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // TODO: Reuse
    const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentPerson((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const onChangeRole = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentPerson((prevState) => ({
            ...prevState,
            role: e.target.value,
        }));
    };

    // TODO: Reuse
    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentPerson((prevState) => ({
            ...prevState,
            birthday: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(createUpdatePerson(currentPerson));
        setCurrentPerson(emptyPerson);
        setOpenModal(false);
    };

    const handleDelete = (id: string) => {
        dispatch(deletePerson(id));
    };

    const handleCreate = () => {
        setCurrentPerson(emptyPerson);
        setOpenModal(true);
    };

    const handleEdit = (id: string) => {
        const selectedPerson = personsData.filter((person) => person.id === id);
        const editPerson = selectedPerson[0];
        setCurrentPerson(editPerson);
        setOpenModal(true);
    };

    return (
        <>
            <Typography className={cssClasses.header} variant={'h5'}>
                Persons
            </Typography>
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
            {openModal && (
                <PersonDialog
                    openDialog={openModal}
                    setOpenDialog={setOpenModal}
                    handleSubmit={handleSubmit}
                    currentPerson={currentPerson}
                    onChange={onChange}
                    onChangeAddress={onChangeAddress}
                    onChangeRole={onChangeRole}
                    onChangeDate={onChangeDate}
                    roles={roles}
                />
            )}
        </>
    );
};

export default PersonsOverview;
