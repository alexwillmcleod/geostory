"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const schema_1 = require("../db/schema");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post('/', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
        return res.status(400).send('Missing required fields');
    if (email.length > 32 ||
        password.length > 32 ||
        name.length > 32)
        return res
            .status(400)
            .send('Email, password, or name is longer than 32 characters');
    const foundUser = await schema_1.User.findOne({ email: email });
    if (foundUser != null)
        return res.status(400).send('user with that email already exists');
    const user = new schema_1.User();
    user.name = name;
    user.password = password;
    user.email = email;
    try {
        await user.save();
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
    return res.status(200).send('successfully created account');
});
exports.router.get('/checkUser/:email', async (req, res) => {
    //Checking by email,username wan not unique in database.
    const { email } = req.params;
    try {
        const foundUser = await schema_1.User.findOne({ email: email });
        if (foundUser) {
            const userId = foundUser.id;
            return res.status(200).json({ id: userId });
        }
        else {
            return res.status(404).send("Does not exist in the system");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while checking user existence.');
    }
});
