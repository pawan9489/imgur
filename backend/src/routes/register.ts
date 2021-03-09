import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const userRegisterRouter = express.Router();

userRegisterRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        userName: req.body.userName,
        password: hashedPassword
    });
    const user = await newUser.save();
    res.send(user);
});

export default userRegisterRouter;