import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'Yup';

import { ButtonPrimary } from '../../components/common/buttons';
import { TextField, TextFieldPassword } from '../../components/common/forms';

const LoginCompany = () => {
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 6 characters'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            console.info('login');
        },
    });
    const { handleSubmit, touched, errors } = formik;
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center gap-2">
                    <div>
                        <p className="text-title-sm font-bold">Company Login</p>
                    </div>
                    <div className="flex flex-col">
                        <TextField
                            name="email"
                            contentBefore={
                                <Icon
                                    icon="mdi:email-outline"
                                    className="dark:text-textDarkTertiary"
                                    width="16"
                                    height="16"
                                />
                            }
                            onChange={formik.handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextFieldPassword
                            name="password"
                            placeholder="Password"
                            fullWidth
                            onChange={formik.handleChange}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </div>
                    <ButtonPrimary
                        text="Login"
                        type="submit"
                        variant="contained"
                        size="md"
                        fullWidth
                    />
                    <p className="text-text-dark-muted text-center">or</p>
                    <ButtonPrimary
                        text="Login as Job Seeker"
                        type="button"
                        variant="text"
                        size="md"
                        onClick={() => void navigate('/login/employee')}
                    />
                </div>
            </Form>
        </FormikProvider>
    );
};

export default LoginCompany;
