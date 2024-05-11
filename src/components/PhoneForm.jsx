import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { MenuItem, TextField, Button } from '@mui/material';

const PhoneForm = () => {
    const initialValues = {
        country: '+1', // Default to United States
        phoneNumber: ''
    };

    const phoneValidationSchema = (countryCode) => yup.object({
        country: yup.string().required('Country is required'),
        phoneNumber: yup.string().matches(new RegExp(`^\\${countryCode}[0-9]{10}$`), 'Phone number is not valid')
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={phoneValidationSchema(initialValues.country)}
            onSubmit={(values) => {
                console.log('Submitted Values:', values);
            }}
            enableReinitialize
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <Field
                        name="country"
                        as={TextField}
                        select
                        label="Country"
                        fullWidth
                        onChange={event => {
                            setFieldValue("country", event.target.value);
                            setFieldValue("phoneNumber", ''); // Reset phone number on country change
                        }}
                    >
                        {countryPhoneCodes.map(option => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.name} ({option.code})
                            </MenuItem>
                        ))}
                    </Field>
                    <Field
                        name="phoneNumber"
                        as={TextField}
                        label="Phone Number"
                        fullWidth
                    />
                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: 16 }}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PhoneForm;
