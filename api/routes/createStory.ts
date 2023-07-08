import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Router } from 'express';

const client = new S3Client({});

const router = Router();

router.post(
  '/story',
  async (req: Express.Request & { files: any }, res: Express.Response) => {
    const fileContent = Buffer.from(req.files.uploadedFileName.data, 'binary');

    const command = new PutObjectCommand({
      Bucket: 'geostory',
      Key: undefined,
      Body: fileContent,
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
);
