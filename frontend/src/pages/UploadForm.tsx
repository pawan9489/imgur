import axios from "axios";
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import LoginStatusStore from "../store/loginStatus";

const acceptableImageFormats = ["image/jpeg", "image/png"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    Card: {
      width: '100%',
    },
    Media: {
      height: 450,
      width: '100%',
      objectFit: 'cover'
    },
  }),
);

type Props = {
    open: boolean,
    handleClose: () => void
}

type Inputs = {
    file: File,
    userName: string,
    description: string,
    tags: [string],
};

export default function UploadForm({open, handleClose}: Props) {
    const { register, handleSubmit, control, errors, reset, getValues } = useForm<Inputs>();
    const [userName] = LoginStatusStore(state => [state.userName]);
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<any>('');
    const [error, setError] = useState<string | null>('');
    const classes = useStyles();

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e?.target?.files;
        const selected = files ? files[0] : null;
        if (selected && acceptableImageFormats.includes(selected.type)) {
            setFile(selected);
            setError(null);
            console.log(selected);
            const reader = new FileReader();
            reader.onload = e => setFileURL(e!.target!.result);
            reader.readAsDataURL(selected);
        } else {
            setFile(null);
            setError(`Please provive file types (${acceptableImageFormats.join(', ')})`);
        }
    };

    const submitForm = async () => {
        const formValue = getValues();
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("userName", userName);
        formData.append("description", formValue.description);
        formData.append("tags", formValue.tags.join(','));
        // console.log(getValues(), formData);
        await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const onClose = () => {
        handleClose();
        setFile(null);
        setFileURL(null);
        setError(null);
        reset();
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
                <DialogTitle id="alert-dialog-title">Upload Image</DialogTitle>
                <DialogContent style={{width: '100%'}}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container className={classes.root} spacing={2} direction="row">
                            <Grid item xs={6}>
                                <input type="file" ref={register} onChange={changeHandler} />
                                {
                                    file ? 
                                    <>
                                    <Card className={classes.Card}>
                                        <CardMedia image={fileURL} className={classes.Media}/>
                                    </Card>
                                    </>
                                    : null
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    error={errors.description !== undefined}
                                    helperText={errors.description && errors.description.message}
                                    autoFocus
                                    inputRef={register({
                                        required: "You must specify an description",
                                        maxLength: {
                                            value: 100,
                                            message: "Description should be exceed 100 characters"
                                        }
                                    })}
                                />
                                <Controller name="tags" defaultValue={[]} control={control} rules={{required: true}}
                                    render={
                                        props => <ChipInput label="Tags" 
                                                    value={props.value} 
                                                    onAdd={chip => props.onChange([...props.value, chip])} 
                                                    onDelete={(chip, index) => props.onChange([...props.value.filter((_ , i) => i !== index)])}
                                                />
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit(submitForm)} color="primary">
                        Submit
                    </Button>
                    <Button onClick={onClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}
