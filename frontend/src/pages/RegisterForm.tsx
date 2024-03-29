import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

type Inputs = {
    userName: string,
    password: string,
    password_repeat: string,
    fullName: string,
    emailAddress: string,
    mobile: string,
};

const RegisterForm = () => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const history = useHistory();
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = (data: Inputs) => {
        console.log(data);
        axios.post('http://localhost:5000/register', {
            userName: data.userName,
            password: data.password,
            fullName: data.fullName,
            email: data.emailAddress,
            mobile: data.mobile,
        }, {
            withCredentials: true
        }).then(res => {
            setApiSuccess(true);
            setApiError(false);
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }).catch(e => {
            setApiSuccess(false);
            setApiErrorMessage(JSON.stringify(e));
            setApiError(true);
        });
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
        </Typography>
                <Box
                    component="form"
                    style={{
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    {
                        apiError ? <Alert severity="error">{apiErrorMessage}</Alert> : null
                    }
                    {
                        apiSuccess ? <Alert severity="success">User registration succeded</Alert> : null
                    }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        name="userName"
                        error={errors.userName !== undefined}
                        helperText={errors.userName && errors.userName.message}
                        autoFocus
                        inputRef={register({
                            required: "You must specify an username",
                            minLength: {
                                value: 6,
                                message: "Username should be atleast 6 characters"
                            }
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        error={errors.fullName !== undefined}
                        helperText={errors.fullName && errors.fullName.message}
                        inputRef={register({
                            required: "You must specify your full name",
                            minLength: {
                                value: 6,
                                message: "Full name should be atleast 6 characters"
                            }
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="emailAddress"
                        label="Email Address"
                        name="emailAddress"
                        error={errors.emailAddress !== undefined}
                        helperText={errors.emailAddress && errors.emailAddress.message}
                        inputRef={register({
                            required: "You must specify an email address",
                            validate: value => 
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || "Please enter a valid email address"
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile Number"
                        name="mobile"
                        error={errors.mobile !== undefined}
                        helperText={errors.mobile && errors.mobile.message}
                        inputRef={register({
                            required: "You must specify a mobile number",
                            validate: value =>
                                /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || "Please enter a valid mobile number"
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={errors.password !== undefined}
                        helperText={errors.password && errors.password.message}
                        inputRef={register({
                            required: "You must specify a password",
                            validate: value => 
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value) || "Password must contain at least 1 alphabet, 1 number & 1 special character"
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_repeat"
                        label="Retype Password"
                        type="password"
                        id="password_repeat"
                        error={errors.password_repeat !== undefined}
                        helperText={errors.password_repeat && errors.password_repeat.message}
                        inputRef={register({
                            validate: value =>
                              value === password.current || "The passwords do not match"
                          })}
                    />
                    <Button onClick={handleSubmit(onSubmit)} type="submit" fullWidth variant="contained" style={{ marginTop: '30px', marginBottom: '20px' }}>
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;