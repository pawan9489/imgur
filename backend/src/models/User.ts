import mongoose from 'mongoose';

const user = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
    password: String,
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: Number,
        unique: true,
    },
    fullName: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("User", user);