import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LoginStatusStore from "../store/loginStatus";

const Home = () => {
    const [isLoggedIn, fullName] = LoginStatusStore(state => [state.isLoggedIn, state.fullName]);
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
                    {
                        isLoggedIn ? <p>Hi {fullName} Welcome to Imgur</p> : <p>Welcome to Imgur, Please login to view and comment on posts</p>
                    }
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;