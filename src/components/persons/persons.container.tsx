import React, { FormEvent, useEffect, useState } from 'react';
import PersonsView from './persons-view';
import PersonModal from './modal/person-modal';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    createUpdatePerson,
    deletePerson,
    getPersons,
    selectPersons,
} from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { PersonModel } from './models/person.model';
import SearchBar from '@snekcode/mui-search-bar';

const emptyForm: PersonModel = {
    id: '',
    company: '',
    firstName: '',
    lastName: '',
    birthday: '',
    address: {
        addressLine1: '',
        postCode: null,
        city: '',
    },
    email: '',
    mobilePhone: null,
    landline: null,
    role: '',
    createdBy: '',
};

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
    const [state, setState] = useState({
        ...emptyForm,
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const onChangeRole = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            role: e.target.value,
        }));
    };

    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            birthday: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(createUpdatePerson(state));
        setState(emptyForm);
        setOpenModal(false);
    };

    const handleDelete = (id: string) => {
        dispatch(deletePerson(id));
    };

    const handleCreate = () => {
        setState(emptyForm);
        setOpenModal(true);
    };

    const handleEdit = (id: string) => {
        const selectedPerson = personsData.filter((person) => person.id === id);
        const editPerson = selectedPerson[0];
        setState(editPerson);
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
                    state={state}
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
