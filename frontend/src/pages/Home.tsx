import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LoginStatusStore from "../store/loginStatus";
import UploadForm from "./UploadForm";
import Button from '@material-ui/core/Button';

const Header = (isLoggedIn: boolean, fullName: string) => <>
    {
        isLoggedIn ? <p>Hi {fullName} Welcome to Imgur</p> : <p>Welcome to Imgur, Please login to view and comment on posts</p>
    }
</>;

const Home = () => {
    const [isLoggedIn, fullName] = LoginStatusStore(state => [state.isLoggedIn, state.fullName]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="md">
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
                    {Header(isLoggedIn, fullName)}
                </Typography>
                {
                    isLoggedIn ? 
                    <>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Upload Image
                    </Button>
                    <UploadForm open={open} handleClose={handleClose}/>
                    </>
                    : null
                }
            </Box>
        </Container>
    );
};

export default Home;