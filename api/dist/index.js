"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const story_1 = require("./routes/story");
const user_1 = require("./routes/user");
(0, dotenv_1.config)(); // Import environment variables from config
const databaseUrl = process.env.DATABASE_URL;
mongoose_1.default.connect(databaseUrl);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    return res.status(200).send('Hello, World!');
});
app.use('/story', story_1.router);
app.use('/user', user_1.router);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
