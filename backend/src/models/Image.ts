import mongoose from 'mongoose';

const image = new mongoose.Schema({
    userName: String,
    fileName: String,
    description: String,
    tags: [String],
    comments: [{
        comment: String,
        userName: String,
        dateOfComment: Date
    }]
});

export default mongoose.model("Image", image);