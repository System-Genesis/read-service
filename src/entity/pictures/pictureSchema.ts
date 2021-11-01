import * as mongoose from 'mongoose';

export type ProfilePictureData = {
    path: string;
    format: string;
    updatedAt?: Date;
    createdAt: Date;
};

export const ProfilePictureSchema = new mongoose.Schema({
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
