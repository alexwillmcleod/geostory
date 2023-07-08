"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Import environment variables from config
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
