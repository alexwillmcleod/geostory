"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeAuth = void 0;
const schema_1 = require("../db/schema");
async function auth(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [email, password] = Buffer.from(b64auth, 'base64')
        .toString()
        .split(':');
    if (!email || !password)
        return res
            .status(400)
            .send('`email` and `password` are required in basic auth');
    const foundUser = await schema_1.User.findOne({ email, password });
    if (!foundUser)
        return res.status(400).send('`email` or `password` is incorrect');
    req.body.user = foundUser;
    return next();
}
exports.default = auth;
async function maybeAuth(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send('`email` and `password` are required fields');
    const foundUser = await schema_1.User.findOne({ email, password });
    req.body.user = foundUser;
    return next();
}
exports.maybeAuth = maybeAuth;
