import axios from "axios";
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import LoginStatusStore from "../store/loginStatus";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        Card: {
            width: '100%',
            marginBottom: '30px'
        },
        Media: {
            height: 450,
            width: '100%',
            objectFit: 'cover'
        },
        listRoot: {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        commentSection: {
            position: 'relative'
        },
        comment: {
            position: 'absolute',
            bottom: 0,
            width: '100%'
        },
        chipsRoot: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            }
        }
    }),
);

type Props = {
    filename: string,
    open: boolean,
    handleClose: () => void
}

export default function CommentForm({ filename, open, handleClose }: Props) {
    const [userName, isLoggedIn] = LoginStatusStore(state => [state.userName, state.isLoggedIn]);
    const classes = useStyles();
    const [imageInfo, setImageInfo] = useState<any>(null);
    const [comment, setComment] = useState('');

    const fetchImageInfo = () => {
        if (filename && open) {
            axios.get(`http://localhost:5000/image/${filename}`)
                .then(e => e.data)
                .then(info => setImageInfo(info))
                .catch(console.log);
        }
    };

    useEffect(() => {
        fetchImageInfo();
    }, [open]);

    const postComment = async () => {
        await axios.post('http://localhost:5000/comment', {
            "fileName": filename,
            "comment": {
                "comment": comment,
                "userName": userName,
                "dateOfComment": new Date().getTime()
            }
        });
        fetchImageInfo();
    };

    const onClose = () => {
        setImageInfo(null);
        setComment('');
        handleClose();
    };

    return (
        <form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">Image</DialogTitle>
                <DialogContent style={{ width: '100%' }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container className={classes.root} spacing={2} direction="row">
                            <Grid item xs={isLoggedIn ? 6 : 12}>
                                <Card className={classes.Card}>
                                    <CardMedia image={`http://localhost:5000/upload/${filename}`} className={classes.Media} />
                                </Card>
                                <div className={classes.chipsRoot}>
                                    {
                                        imageInfo?.tags?.map((tag: string) => 
                                        <>
                                            <Chip label={tag} />
                                        </>)
                                    }
                                </div>
                            </Grid>
                            {
                                isLoggedIn ? 
                                <> 
                                    <Grid item xs={6} className={classes.commentSection}>
                                        <List className={classes.listRoot}>
                                            {
                                                imageInfo?.comments?.map(comment => 
                                                <>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={comment.userName}
                                                            secondary={
                                                                <>
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.inline}
                                                                        color="textPrimary"
                                                                    >
                                                                        {comment.comment}
                                                                    </Typography>
                                                                    <Typography variant="caption" display="block" gutterBottom>
                                                                        {new Date(comment.dateOfComment).toUTCString().replace('GMT', '')}
                                                                    </Typography>
                                                                </>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>)
                                            }
                                        </List>
                                        <TextField
                                            className={classes.comment}
                                            id="filled-multiline-flexible"
                                            label="Comment"
                                            multiline
                                            rowsMax={4}
                                            value={comment}
                                            onChange={e => setComment(e.target!.value)}
                                            variant="filled"
                                        />
                                    </Grid>
                                </> : null
                            }
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        isLoggedIn ? 
                        <Button onClick={postComment} color="primary">
                            Post comment
                        </Button> : null
                    }
                    <Button onClick={onClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}
