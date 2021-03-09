import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const userRegisterRouter = express.Router();

interface UserDocument {
    userName: string,
    password: string,
    email: string,
    mobile: Number,
    fullName: string,
    isAdmin: boolean
}

userRegisterRouter.post('/', async (req: Request, res: Response) => {
    const {userName, password, email, mobile, fullName} = req?.body;
    if (!userName || !password 
        || typeof userName !== 'string' || typeof password !== 'string' ) {
        res.status(404).send("Invalid data");
        return;
    }
    User.findOne({userName}, async (err: Error, doc: UserDocument) => {
        if (err) throw err;
        if (doc) res.status(404).send("User Already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                userName: userName,
                password: hashedPassword,
                email: email, 
                mobile: mobile, 
                fullName: fullName
            });
            const user = await newUser.save();
            res.send(user);
        }
    });
});

export default userRegisterRouter;