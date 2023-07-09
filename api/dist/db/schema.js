"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Story = exports.userSchema = exports.storySchema = void 0;
const mongoose_1 = require("mongoose");
exports.storySchema = new mongoose_1.Schema({
    name: String,
    author: mongoose_1.Schema.ObjectId,
    description: String,
    photo: String,
    audio: String,
});
exports.userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
exports.userSchema.statics.findUserByEmail = function (email) {
    return this.find({ email });
};
exports.Story = (0, mongoose_1.model)('story', exports.storySchema);
exports.User = (0, mongoose_1.model)('user', exports.userSchema);
