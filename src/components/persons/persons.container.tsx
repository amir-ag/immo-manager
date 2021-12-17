import React, { FormEvent, useEffect, useState } from 'react';
import PersonsView from './persons-view';
import PersonModal from './modal/person-modal';
import { roles } from './models/person-roles.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUpdatePerson, deletePerson, getPersons } from '../../store/slices/persons.slice';
import PersonsTable from './table/persons-table';
import { selectPersons } from '../../store/selectors';
import { emptyPerson } from './models/person.model';

const PersonsContainer = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [currentPerson, setCurrentPerson] = useState({
        ...emptyPerson,
    });
    const personsData = useAppSelector(selectPersons);

    useEffect(() => {
        dispatch(getPersons());
    }, [dispatch]);

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
            <PersonsView handleCreate={handleCreate} />
            {personsData && (
                <PersonsTable personsData={personsData} handleDelete={handleDelete} handleEdit={handleEdit} />
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
