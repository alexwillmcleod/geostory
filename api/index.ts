import express from 'express';
import { config } from 'dotenv';

config(); // Import environment variables from config

const app = express();
app.get('/', async (req, res) => {
  return res.status(200).send('Hello, World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
