import React, {FormEvent, useState} from 'react';
import {
    Button,
    Container,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {grey} from "@material-ui/core/colors";
import PeopleModal from "../PeopleModal/PeopleModal";


const roles = [
    {
        value: 'Owner',
    },
    {
        value: 'Tenant',
    },
    {
        value: 'Service Provider',
    },
    {
        value: 'Wait list',
    },
];



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
    },
    header: {
        flexGrow: 1,
    },
    headerContainer: {
        display: 'flex',
        borderBottom: `1px solid ${grey[300]}`,
        padding: theme.spacing(2)
    },
}))

const People = () => {

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


    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <Container className={classes.headerContainer} maxWidth="xl">
                <Typography variant={"h6"} className={classes.header}>
                    Create new People
                </Typography>
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon/>}
                >
                    New
                </Button>
            </Container>
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
        </Paper>
    );
};

export default People;
