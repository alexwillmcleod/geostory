"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const express_1 = require("express");
const client = new client_s3_1.S3Client({});
exports.router = (0, express_1.Router)();
exports.router.post('/', async (req, res) => {
    if (!req.body.uploadedFileName)
        return res.status(400).send('you must upload a file');
    const fileContent = Buffer.from(req.body.uploadedFileName.data, 'binary');
    const command = new client_s3_1.PutObjectCommand({
        Bucket: 'geostory',
        Key: undefined,
        Body: fileContent,
    });
    try {
        const response = await client.send(command);
        if (!response)
            return res.status(500).send('failed to upload audio');
    }
    catch (err) {
        console.error(err);
    }
});
