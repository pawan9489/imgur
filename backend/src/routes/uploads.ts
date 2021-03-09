import express, { Request, Response } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

const uploadsRouter = (gfs: any, upload: multer.Multer) => {
    const router = express.Router();

    router.post("/", upload.single("file"), (req: Request, res: Response) => {
        res.send("Successfully uploaded");
    });

    router.get("/:filename", (req: Request, res: Response) => {
        const file = gfs
            .find({
                filename: req.params.filename
            })
            .toArray((err: Error, files: any) => {
                if (!files) {
                    return res.status(404).json({
                        err: "no files exist"
                    });
                }
                gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            });
    });

    router.delete("/:id", (req: Request, res: Response) => {
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err: Error, data: any) => {
            if (err) return res.status(404).json({ err: err.message });
            res.send("Successfully deleted");
        });
    });

    return router;
};

export default uploadsRouter;