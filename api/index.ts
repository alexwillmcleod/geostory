import express from 'express';
import qrcode from 'qrcode';
import { MongoClient } from "mongodb";
import { config } from 'dotenv';

config(); // Import environment variables from config

const app = express();
app.get('/', async (req, res) => {
  return res.status(200).send('Hello, World!');
});

app.post('/story', async(req,res)=>{
let text = "hi";
qrcode.toString(text, { type: 'terminal' }, (err, qrCodeText) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(qrCodeText);
});

});

app.post('/')




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
