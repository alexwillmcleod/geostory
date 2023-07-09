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
  '/',
  upload.fields([{ name: 'photo' }, { name: 'audio' }]),
  auth,
  async (req: Request, res: Response) => {
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

    if (!audioFile) return res.status(400).send('missing audio field');
    const audioExtension = path.extname(audioFile.originalname);

    if (!photoFile) return res.status(400).send('missing photo field');
    const photoExtension = path.extname(photoFile.originalname);

    let audioFileKey: string = `${uuidv4()}${audioExtension}`;
    const audioCommand = new PutObjectCommand({
      Bucket: 'geostory',
      Key: audioFileKey,
      Body: fs.readFileSync(audioFile.path),
      ContentType: 'audio/mpeg',
    });

    let photoFileKey: string = `${uuidv4()}${photoExtension}`;
    const photoCommand = new PutObjectCommand({
      Bucket: 'geostory',
      Key: photoFileKey,
      Body: fs.readFileSync(photoFile.path),
    });

    const audioFileUrl = `https://geostory.s3.amazonaws.com/${audioFileKey}`;
    const photoFileUrl = `https://geostory.s3.amazonaws.com/${photoFileKey}`;

    const storyDoc = new Story({
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
    photo: foundStory.photo,
  };

  return res.status(200).json(story);
});
