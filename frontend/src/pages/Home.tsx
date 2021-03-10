import { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LoginStatusStore from "../store/loginStatus";
import UploadForm from "./UploadForm";
import Button from '@material-ui/core/Button';
import axios from "axios";

const Header = (isLoggedIn: boolean, fullName: string) => <>
    {
        isLoggedIn ? <p>Hi {fullName} Welcome to Imgur</p> : <p>Welcome to Imgur, Please login to view and comment on posts</p>
    }
</>;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    grid: {
        marginTop: '30px',
    },
});

type Image = {
    _id: string,
    length: Number,
    chunkSize: Number,
    uploadDate: string,
    filename: string,
    md5: string,
    contentType: string
}

const Home = () => {
    const classes = useStyles();
    const [isLoggedIn, fullName] = LoginStatusStore(state => [state.isLoggedIn, state.fullName]);
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<[Image]>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const f = async () => {
            const imagesMetadata = await axios.get('http://localhost:5000/upload/files').then(e => e.data);
            setImages(imagesMetadata);
        };
        if (!open) {
            f();
        }
    }, [open]);

    return (
        <Container component="main" maxWidth="lg">
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
                            <UploadForm open={open} handleClose={handleClose} />
                        </>
                        : null
                }
            </Box>
            <Grid container spacing={2} className={classes.grid}>
                {
                    images && images.map(image => <Grid key={image._id} item>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={encodeURI(`http://localhost:5000/upload/${image.filename}`)}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Random Description
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Comment
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>)
                }
            </Grid>
        </Container>
    );
};

export default Home;