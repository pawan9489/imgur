import axios from "axios";
import React, { useState } from "react";

const acceptableImageFormats = ["image/jpeg", "image/png"];

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>('');

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e?.target?.files;
        const selected = files ? files[0] : null;
        if (selected && acceptableImageFormats.includes(selected.type)) {
            setFile(selected);
            setError(null);
            console.log(selected);
            const formData = new FormData();
            formData.append("file", selected);
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            setFile(null);
            setError(`Please provive file types (${acceptableImageFormats.join(', ')})`);
        }
    };

    return (
        <form>
            <input type="file" onChange={changeHandler}/>
        </form>
    )
}
