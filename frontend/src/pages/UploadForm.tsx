import React, { useState } from "react";

const acceptableImageFormats = ["image/jpeg", "image/png"];

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>('');

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e?.target?.files;
        const selected = files ? files[0] : null;
        if (selected && acceptableImageFormats.includes(selected.type)) {
            setFile(selected);
            setError(null);
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
