"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../../config");
const FolderSchema = new mongoose.Schema({
    folderId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const FolderModel = mongoose.model(config_1.default.mongo.featureCollectionName, FolderSchema);
exports.default = FolderModel;
//# sourceMappingURL=model.js.map