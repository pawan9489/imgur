import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import userRouter from './routes/users';
import userRegisterRouter from './routes/register';

mongoose.connect("mongodb://mongo:27017/imgur", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to Mongo DB`)).catch((e: Error) => console.error(e.message));

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.send("Hey");
});

// Routes
app.use('/users', userRouter);
app.use('/register', userRegisterRouter);

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
