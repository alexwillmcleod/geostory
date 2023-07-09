"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const uuid_1 = require("uuid");
const schema_1 = require("../db/schema");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const upload = (0, multer_1.default)({ dest: path_1.default.resolve(__dirname, './uploads/') });
const client = new client_s3_1.S3Client({ region: 'us-east-1' });
exports.router = (0, express_1.Router)();
exports.router.post('/:name/:description', upload.single('audio'), auth_1.default, async (req, res) => {
    const { name, description } = req.params;
    if (!name || !description)
        return res
            .status(400)
            .send('`name` and `description` are required fields');
    console.log(req.file);
    const file = req.file;
    if (!file)
        return res.status(400).send('missing audio field');
    const extension = path_1.default.extname(file.originalname);
    console.log(file.buffer);
    let fileKey = `${(0, uuid_1.v4)()}${extension}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: 'geostory',
        Key: fileKey,
        Body: fs_1.default.readFileSync(file.path),
        ContentType: 'audio/mpeg',
    });
    const fileUrl = `https://geostory.s3.amazonaws.com/${fileKey}`;
    const storyDoc = new schema_1.Story({
        name,
        author: req.body.user._id,
        audio: fileUrl,
        description,
    });
    try {
        const response = await client.send(command);
        if (!response)
            return res.status(500).send('failed to upload audio');
        await storyDoc.save();
    }
    catch (err) {
        console.error(err);
    }
    return res.status(200).send(storyDoc._id);
});
exports.router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).send('`id` is a required param');
    const foundStory = await schema_1.Story.findById(id);
    if (!foundStory)
        return res.status(400).send('could not find story with that id');
    const author = await schema_1.User.findById(foundStory.author);
    if (!author)
        return res.status(500).send('could not find author for post');
    const story = {
        name: foundStory.name,
        authorName: author.name,
        description: foundStory.description,
        audio: foundStory.audio,
    };
    return res.status(200).json(story);
});
