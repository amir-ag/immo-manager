import React, { FormEvent, useEffect, useState } from 'react';
import PersonModal from './modal/person-modal';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUpdatePerson, deletePerson, getPersons } from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { selectPersons } from '../../store/selectors';
import { emptyPerson } from './models/person.model';
import SearchHeader from '../ui/searc-header/search-header';

const PersonsOverview = () => {
    const dispatch = useAppDispatch();
    const personsData = useAppSelector(selectPersons);

    useEffect(() => {
        dispatch(getPersons());
    }, [dispatch]);

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
            <SearchHeader
                handleCreate={handleCreate}
                title={'Create new Person'}
                originalData={personsData}
                setsearchResult={setSearchResult}
                searchParams={['firstName', 'lastName', 'email']}
            />
            {personsData && (
                <PersonsTable
                    personsData={searchResult}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
            {openModal && (
                <PersonModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
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
