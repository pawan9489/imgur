import {PassportStatic} from 'passport';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const serdeUser = (passport: PassportStatic, LocalStrategy: any) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'userName',
            passwordField: 'password',
            session: false
        },
        (userName: string, password: string, done:any) => {
            User.findOne({userName}, (err: Error, user: any) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err: Error, result: boolean) => {
                    if (err) throw err;
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        }
    ));
    
    passport.serializeUser((user: any, cb) => {
        cb(null, user.id);
    });
    
    passport.deserializeUser((id: string, cb) => {
        User.findOne({_id: id}, (err: Error, user: any) => {
            if (err) throw err;
            const userInfo = {
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                isAdmin: user.isAdmin,
            };
            cb(err, userInfo);
        })
    });
};

export default serdeUser;
