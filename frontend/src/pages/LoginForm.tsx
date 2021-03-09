import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import LoginStatusStore from "../store/loginStatus";
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

type Inputs = {
    userName: string,
    password: string,
};

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const [toggleLoggedIn] = LoginStatusStore(state => [state.toggleLoggedIn]);
    const [apiError, setApiError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: Inputs) => {
        axios.post('http://localhost:5000/login', {
            userName: data.userName,
            password: data.password
        }, {
            withCredentials: true
        }).then(res => {
            setApiError(false);
            toggleLoggedIn();
            history.push("/");
        }).catch(e => {
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
                    Log in
    </Typography>
                <Box
                    component="form"
                    style={{
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    {
                        apiError ? <Alert severity="error">Username or Password is not correct</Alert> : null
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
                            required: "You must specify a password"
                        })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button onClick={handleSubmit(onSubmit)} type="submit" fullWidth variant="contained" style={{ marginTop: '30px', marginBottom: '20px' }}>
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;