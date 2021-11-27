import React, { FormEvent, useEffect, useState } from 'react';
import PersonsView from './persons-view';
import PersonModal from './modal/person-modal';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPerson, deletePerson, getPersons, selectPersons } from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { PersonModel } from './models/person.model';

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
    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState({
        ...emptyForm,
    });
    const personsData = useAppSelector(selectPersons);

    useEffect(() => {
        dispatch(getPersons());
    }, [dispatch]);

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
        console.log('state: ', state);
        e.preventDefault();
        dispatch(createPerson(state));
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
        console.log('personsData: ', personsData);
        const selectedPerson = personsData.filter((person) => person.id === id);
        const editPerson = selectedPerson[0];
        setState(editPerson);
        setOpenModal(true);
    };

    return (
        <>
            <PersonsView handleCreate={handleCreate} />
            {personsData && (
                <PersonsTable personsData={personsData} handleDelete={handleDelete} handleEdit={handleEdit} />
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
