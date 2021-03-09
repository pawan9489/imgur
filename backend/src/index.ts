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
import uploadRouter from './routes/uploads';
import serdeUser from "./services/passportStrategy";
import gridFsSetup from "./services/gridFsSetup";
import Grid from 'gridfs-stream';

// MongoDB
const db = 'imgur';
const url = `mongodb://mongo:27017/${db}`;
let gfs: any;
const connection = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to Mongo DB`)).catch((e: Error) => console.error(e.message));

// GridFS
const upload = gridFsSetup(url);

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Session & Cookies
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser());
// Passport for Serde
const LocalStrategy = passportLocal.Strategy;
app.use(passport.initialize());
app.use(passport.session());
serdeUser(passport, LocalStrategy);

// Login & Get Session User
app.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.send("Successfully authenticated");
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.get("/logout", (req, res) => {
    req.logout();
    res.send("Success")
});

// Routes
app.use('/users', userRouter);
app.use('/register', userRegisterRouter);
connection.then(() => {
    // init stream
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('imageUpload');
    app.use('/upload', uploadRouter(gfs, upload!));
});

// App start
const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
