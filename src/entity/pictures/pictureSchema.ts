import mongoose from 'mongoose';

export type ProfilePictureData = {
    path: string;
    format: string;
    updatedAt?: Date;
    createdAt?: Date;
};

export type pictures = {
    profile: {
        // TODO: add url? pictures DTO?
        meta: ProfilePictureData;
    };
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
