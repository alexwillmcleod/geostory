import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Router } from 'express';

const client = new S3Client({});

export const router = Router();

router.post('/', auth, async (req: any, res: any) => {
  if (!req.body.uploadedFileName)
    return res.status(400).send('you must upload a file');

  const fileContent = Buffer.from(req.body.uploadedFileName.data, 'binary');

  const command = new PutObjectCommand({
    Bucket: 'geostory',
    Key: undefined,
    Body: fileContent,
  });

  try {
    const response = await client.send(command);
    if (!response) return res.status(500).send('failed to upload audio');
  } catch (err) {
    console.error(err);
  }
});
