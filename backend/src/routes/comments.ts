import express, { Request, Response } from 'express';
import Image from '../models/Image';

const commentRouter = express.Router();

commentRouter.post('/', async (req: Request, res: Response) => {
    const image: any = await Image.findOne({fileName: req.body.fileName});
    if (!image) {
        return res.status(404).send(`No file with name ${req.body.fileName}`);
    }
    const {comment, userName, dateOfComment} = req.body.comment;
    image.comments.push({
        comment, userName, dateOfComment
    });
    await image.save();
    res.send('Successfully added comment');
});

export default commentRouter;