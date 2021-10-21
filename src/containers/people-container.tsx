import React, {FormEvent, useState} from 'react';
import People from "../components/People/People";
import Table from "../components/ContentTable/ContentTable";
import PeopleModal from "../components/PeopleModal/PeopleModal";
import {roles} from "../appConfig";

const PeopleContainer = () => {

    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        street: "",
        houseNumber: "",
        zip: null,
        city: "",
        email: "",
        mobilePhone: null,
        landline: null,
        role: "",
        type: ""
        }
    )

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    // find a way to include 'onChangeRole' and 'onChangeType' in 'onChange', problem: e.target.id is undefined

    const onChangeRole = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            role: e.target.value
        }))
    }

    const onChangeType = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            type: e.target.value
        }))
    }

    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            birthday: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('submitting..')
        console.log('state: ', state)
        setOpenModal(false)
    }

    return (
        <>
            <People
                setOpenModal={setOpenModal}
            />
            <Table/>
            {openModal &&
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
            }
        </>
    );
};

export default PeopleContainer;
