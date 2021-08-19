import * as mongoose from 'mongoose';

const ProfilePictureSchema = new mongoose.Schema({
    path: {
        type: String,
    },
    takenAt: {
        type: Date,
    },
    format: {
        type: String,
    },
    updatedAt: { type: Date, default: Date.now },
});

export default ProfilePictureSchema;
