import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FullFeaturedCrudGrid from '../ContactTable';

function ContactForm() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [tableData, setTableData] = useState([])
    const defaultTheme = createTheme();
    const API_URL = 'https://localhost:5001/api/contact';

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setTableData(result.data)
        } catch (error) {
            console.error(error);
        }
    };

    const addUpdateData = async (data) => {
        try {
            const response = await fetch(API_URL, {
                method: data.id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData()
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getRowData = (data) => {
        setFormData(data);
        // if (ref.current) {
        //     ref.current.focus();
        // }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addUpdateData(formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: ''
            });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = 'First Name is required';
        if (!formData.lastName) tempErrors.lastName = 'Last Name is required';
        if (!formData.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is not in valid format.';
        }
        if (!formData.phoneNumber) {
            tempErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = 'Phone Number must be 10 digit.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Contact Form
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone Number"
                                        variant="outlined"
                                        type="tel"
                                        fullWidth
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <FullFeaturedCrudGrid rowData={tableData} deleteAction={deleteData} getRowData={getRowData} />
        </>
    )
}
export default ContactForm