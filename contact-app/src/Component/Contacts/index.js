import React from 'react'
import ContactForm from '../../Component/ContactForm';
import { Container } from '@mui/material';

function Contacts(props) {
    return (
        <>
            <Container component="main" maxWidth="md">
                <ContactForm />
            </Container>
        </>
    );
}

Contacts.propTypes = {}

export default Contacts