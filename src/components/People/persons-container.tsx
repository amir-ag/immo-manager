import React, { FormEvent, useEffect, useState } from 'react';
import Persons from './Persons';
import PeopleModal from '../PeopleModal/PeopleModal';
import { roles } from '../../appConfig';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPerson, getPersons, selectPersons } from '../../slices/personsSlice';
import ContentTable from '../ContentTable/ContentTable';

const emptyForm = {
    firstName: '',
    lastName: '',
    birthday: '',
    street: '',
    houseNumber: '',
    zip: null,
    city: '',
    email: '',
    mobilePhone: null,
    landline: null,
    role: '',
    type: '',
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

    // find a way to include 'onChangeRole' and 'onChangeType' in 'onChange', problem: e.target.id is undefined

    const onChangeRole = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            role: e.target.value,
        }));
    };

    const onChangeType = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            type: e.target.value,
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
        console.log('state: ', state);
        dispatch(createPerson(state));
        setState(emptyForm);
        setOpenModal(false);
    };

    return (
        <>
            <Persons setOpenModal={setOpenModal} />
            {personsData && <ContentTable personsData={personsData} />}
            {openModal && (
                <PeopleModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleSubmit={handleSubmit}
                    state={state}
                    onChange={onChange}
                    onChangeRole={onChangeRole}
                    onChangeType={onChangeType}
                    onChangeDate={onChangeDate}
                    roles={roles}
                />
            )}
        </>
    );
};

export default PersonsContainer;
