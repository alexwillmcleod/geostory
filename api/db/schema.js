"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Story = void 0;
var mongoose_1 = require("mongoose");
var storySchema = new mongoose_1.Schema({
    name: String,
    author: mongoose_1.Schema.ObjectId,
    description: String,
    audio: String,
});
var userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
});
exports.Story = (0, mongoose_1.model)('story', storySchema);
exports.User = (0, mongoose_1.model)('user', userSchema);
