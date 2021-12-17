import React, { FormEvent, useEffect, useState } from 'react';
import PersonsView from './persons-view';
import PersonModal from './modal/person-modal';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUpdatePerson, deletePerson, getPersons } from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { selectPersons } from '../../store/selectors';
import SearchBar from '@snekcode/mui-search-bar';
import { emptyPerson } from './models/person.model';

const PersonsContainer = () => {
    const dispatch = useAppDispatch();

    const personsData = useAppSelector(selectPersons);

    useEffect(() => {
        dispatch(getPersons());
    }, [dispatch]);

    useEffect(() => {
        setData(personsData);
    }, [personsData]);

    const [openModal, setOpenModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(personsData);
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

    const requestSearch = (searchValue: string) => {
        const searchResult = personsData.filter(
            (row) =>
                row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.address.addressLine1.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.address.city.includes(searchValue.toLowerCase()) ||
                row.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(searchResult);
    };

    const cancelSearch = () => {
        setSearchValue('');
        requestSearch(searchValue);
    };

    return (
        <>
            <PersonsView handleCreate={handleCreate} />
            <SearchBar
                value={searchValue}
                onChange={(searchValue) => requestSearch(searchValue)}
                onCancelSearch={() => cancelSearch()}
                style={{ justifyContent: 'normal', margin: '10px 0' }}
            />
            {personsData && (
                <PersonsTable personsData={data} handleDelete={handleDelete} handleEdit={handleEdit} />
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

export default PersonsContainer;
