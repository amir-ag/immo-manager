import React, {FormEvent, useState} from 'react';
import People from "../components/People/People";
import Table from "../components/ContentTable/ContentTable";
import PeopleModal from "../components/PeopleModal/PeopleModal";
import {roles} from "../appConfig";

const PeopleContainer = () => {

    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState({
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            city: '',
            phone: '',
            role: ''
        }
    )

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onChangeRole = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            "role": e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('submitting..')
        setOpenModal(false)
    }

    return (
        <>
            <People
                setOpenModal={setOpenModal}
            />
            <Table/>
            {openModal && <PeopleModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleSubmit={handleSubmit}
                state={state}
                onChange={onChange}
                onChangeRole={onChangeRole}
                roles={roles}
            />
            }
        </>
    );
};

export default PeopleContainer;
