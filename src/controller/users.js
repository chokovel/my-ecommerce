"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const UserServices = __importStar(require("../services/users"));
const usersValidation_1 = require("../utils/usersValidation");
const product_1 = __importDefault(require("../services/product"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateUser)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.signup(req.body);
        res.status(201).redirect('/dashboard');
        // res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.signup = signup;
// export const logout = async (req: Request, res: Response) => {
// 	if(req.session){
// 		req.session.destroy(() => {
// 			req.logout:();
// 			req.flash('success','Successfully logged out!');
// 			res.redirect("/");)
// 	}
// }
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateLogin)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.login(req.body);
        const products = yield product_1.default.getProductsByUser(user.id);
        req.session.regenerate(function (err) {
            if (err)
                throw new Error(err);
            // store user information in session, typically a user id
            req.session.user = user;
            req.session.save(function (err) {
                if (err)
                    throw new Error(err);
                //   res.status(200).render('dashboard');
                res.status(301).redirect('dashboard');
            });
        });
        return;
        // res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.login = login;
// export const show = async (req: Request, res: Response) => {
//     try {
//         // console.log(req.params.id)
//         const products = await ProductService.getProducts();
//         let section = products[req.params.id]
//         res.render('show', {section})
//     } catch (err) {
//         console.log(err)
//     }
// }
