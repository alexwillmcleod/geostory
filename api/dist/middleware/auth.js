"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function auth(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.slice(7);
    if (!token)
        return res.status(400).send('Unauthorized');
    const JWT_SECRET = process.env.JWT_SECRET;
    (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(400).send('Invalid Token');
        req.body.user = decoded;
    });
    return next();
}
exports.default = auth;
function maybeAuth(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.slice(7);
    if (!token)
        return next();
    const JWT_SECRET = process.env.JWT_SECRET;
    (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return next();
        req.body.user = decoded;
    });
    return next();
}
exports.maybeAuth = maybeAuth;
