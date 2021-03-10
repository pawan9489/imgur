import express, { Request, Response } from 'express';
import Image from '../models/Image';

const imageRouter = express.Router();

imageRouter.get('/:fileName', async (req: Request, res: Response) => {
    const image: any = await Image.findOne({fileName: req.params.fileName});
    if (!image) {
        return res.status(404).send(`No file with name ${req.params.fileName}`);
    }
    res.send(image);
});

export default imageRouter;