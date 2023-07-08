"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const schema_1 = require("../db/schema");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post('/', async (req, res) => {
    console.log(req.body);
    const { email, password, name } = req.body;
    if (!email || !password || !name)
        return res.status(400).send('Missing required fields');
    console.log(`email: ${email}`);
    if (email.length > 32 ||
        password.length > 32 ||
        name.length > 32)
        return res
            .status(400)
            .send('Email, password, or name is longer than 32 characters');
    const foundUser = await schema_1.User.findOne({ email: email });
    console.log(`foundUser = ${foundUser}`);
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
