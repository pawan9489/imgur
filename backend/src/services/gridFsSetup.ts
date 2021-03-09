import mongoose from 'mongoose';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import GridFsStorage from 'multer-gridfs-storage';

const gridFsSetup = (url: string) => {
    // Storage
    const storage = new GridFsStorage({
        url: url,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString("hex") + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: "uploads"
                    };
                    resolve(fileInfo);
                });
            });
        }
    });

    const upload = multer({
        storage
    });

    return upload;
};

export default gridFsSetup;