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
exports.router.post('/', upload.fields([{ name: 'photo' }, { name: 'audio' }]), auth_1.default, async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description)
        return res
            .status(400)
            .send('`name` and `description` are required fields');
    // @ts-ignore
    const audioFileList = req.files['audio'];
    // @ts-ignore
    const photoFileList = req.files['photo'];
    if (!audioFileList || !photoFileList)
        return res.status(400).send('missing audio or photo file');
    const audioFile = audioFileList[0];
    const photoFile = photoFileList[0];
    if (!audioFile)
        return res.status(400).send('missing audio field');
    const audioExtension = path_1.default.extname(audioFile.originalname);
    if (!photoFile)
        return res.status(400).send('missing photo field');
    const photoExtension = path_1.default.extname(photoFile.originalname);
    let audioFileKey = `${(0, uuid_1.v4)()}${audioExtension}`;
    const audioCommand = new client_s3_1.PutObjectCommand({
        Bucket: 'geostory',
        Key: audioFileKey,
        Body: fs_1.default.readFileSync(audioFile.path),
        ContentType: 'audio/mpeg',
    });
    let photoFileKey = `${(0, uuid_1.v4)()}${photoExtension}`;
    const photoCommand = new client_s3_1.PutObjectCommand({
        Bucket: 'geostory',
        Key: photoFileKey,
        Body: fs_1.default.readFileSync(photoFile.path),
    });
    const audioFileUrl = `https://geostory.s3.amazonaws.com/${audioFileKey}`;
    const photoFileUrl = `https://geostory.s3.amazonaws.com/${photoFileKey}`;
    const storyDoc = new schema_1.Story({
        name,
        author: req.body.user._id,
        audio: audioFileUrl,
        photo: photoFileUrl,
        description,
    });
    try {
        const audioResponse = await client.send(audioCommand);
        const photoResponse = await client.send(photoCommand);
        if (!audioResponse || !photoResponse)
            return res.status(500).send('failed to upload audio or photo');
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
        photo: foundStory.photo,
    };
    return res.status(200).json(story);
});
