"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const { User } = require("../models");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("decoded", decoded);
                const user = yield User.findOne({ where: { id: decoded.id } });
                req.user = user;
                return next();
            }
            catch (error) {
                res.status(400).send("Invalid token");
            }
        }
        else {
            return res.status(404).send("Bearer token is missing");
        }
    });
}
exports.verifyToken = verifyToken;
module.exports = verifyToken;
