import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { Request, Router, Response } from 'express';
import auth from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import { Story, User } from '../db/schema';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: path.resolve(__dirname, './uploads/') });

const client = new S3Client({ region: 'us-east-1' });

export const router = Router();

router.post(
  '/:name/:description',
  upload.single('audio'),
  auth,
  async (req: Request, res: Response) => {
    const { name, description } = req.params;

    if (!name || !description)
      return res
        .status(400)
        .send('`name` and `description` are required fields');

    console.log(req.file);

    const file = req.file;
    if (!file) return res.status(400).send('missing audio field');
    const extension = path.extname(file.originalname);

    console.log(file.buffer);

    let fileKey: string = `${uuidv4()}${extension}`;
    const command = new PutObjectCommand({
      Bucket: 'geostory',
      Key: fileKey,
      Body: fs.readFileSync(file.path),
      ContentType: 'audio/mpeg',
    });

    const fileUrl = `https://geostory.s3.amazonaws.com/${fileKey}`;

    const storyDoc = new Story({
      name,
      author: req.body.user._id,
      audio: fileUrl,
      description,
    });

    try {
      const response = await client.send(command);
      if (!response) return res.status(500).send('failed to upload audio');
      await storyDoc.save();
    } catch (err) {
      console.error(err);
    }

    return res.status(200).send(storyDoc._id);
  }
);

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('`id` is a required param');
  const foundStory = await Story.findById(id);
  if (!foundStory)
    return res.status(400).send('could not find story with that id');

  const author = await User.findById(foundStory.author);
  if (!author) return res.status(500).send('could not find author for post');

  const story = {
    name: foundStory.name,
    authorName: author.name,
    description: foundStory.description,
    audio: foundStory.audio,
  };

  return res.status(200).json(story);
});
