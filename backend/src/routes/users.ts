import express, { Request, Response } from 'express';
import User from '../models/User';

const userRouter = express.Router();

userRouter.get('/:name', async (req: Request, res: Response) => {
    const user = await User.find({userName: req.params.name});
    res.send(user);
});

export default userRouter;