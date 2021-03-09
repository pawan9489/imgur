import express, { Request, Response } from 'express';
import multer from 'multer';
import { Grid } from 'gridfs-stream';

const uploadsRouter = (gfs: Grid, upload: multer.Multer) => {
    const router = express.Router();

    router.post("/", upload.single("file"), (req: Request, res: Response) => {
        res.json({ file: req.file })
    });

    router.get("/:filename", (req: Request, res: Response) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            //check if files exist
            if (!file || file.length == 0) {
                return res.status(404).json({
                    err: "No files exist"
                })
            }
            //file exist
            if (file.contentType === 'image/jpeg' || file.contentType === "img/png") {
                //read output to browser
                const readStream = gfs.createReadStream(file.filename)
                readStream.pipe(res);
            } else {
                res.status(404).json({
                    err: "Not an image"
                });
            }
        })
    });

    router.get('/files', (req: Request, res: Response) => {
        gfs.files.find().toArray((err: Error, files) => {
            //check if files exist
            if (!files || files.length == 0) {
                return res.status(404).json({
                    err: "No files exist"
                })
            }
            // files exist
            return res.json(files)
        })
    })

    router.delete("/:id", (req: Request, res: Response) => {
        gfs.remove({ _id: req.params.id, root: 'imageUpload' }, (err: Error) => {
            if (err) {
                return res.status(404).json({ err: err })
            }
            res.send("Successfully deleted");
        })
    });

    return router;
};

export default uploadsRouter;