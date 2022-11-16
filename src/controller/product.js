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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../services/product"));
const product_2 = __importDefault(require("../utils/product"));
const msgTypes_1 = __importDefault(require("../utils/validation/msgTypes"));
const env_1 = __importDefault(require("../config/env"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        (_a = req.body) === null || _a === void 0 ? true : delete _a.image;
        const { error } = (0, product_2.default)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filepath = req.file.path.split("public")[1];
        const product = yield product_1.default.createProduct(Object.assign(Object.assign({}, req.body), { image: `${env_1.default.FILE_HOST}${filepath}`, authorId: (_c = (_b = res.locals) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id }));
        res.status(201).redirect('dashboard');
        // res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product });
    }
    catch (error) {
        // console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const getProductsForDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        let products = yield product_1.default.getProductsByUser((_e = (_d = res.locals) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id);
        // console.log("produtscddd",  products);
        res.status(200).render('dashboard', { products });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield product_1.default.getProducts();
        res.status(200).render('index.ejs', { products: products });
        // res.status(200).json({ message: MSG_TYPES.PRODUCTS_FOUND, products });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.getProductById(req.params.id);
        res.status(200).render('show', { section: product });
        // res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const getProductByIdForEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.getProductById(+req.params.id);
        res.status(200).render('editproduct', { product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, product_2.default)(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        // console.log(req.body);
        // console.log(req.file);
        const filepath = req.file.path.split("public")[1];
        const product = yield product_1.default.updateProduct(req.params.id, Object.assign(Object.assign({}, req.body), { userId: res.locals.user.id, image: `${env_1.default.FILE_HOST}${filepath}` }));
        // res.status(200).json({ message: MSG_TYPES.PRODUCT_UPDATED, product });
        res.status(301).redirect('/dashboard');
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        // console.log(req.params.id, req.user.id);
        const product = yield product_1.default.deleteProduct(req.params.id, (_g = (_f = res.locals) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.id);
        res.status(301).redirect('/dashboard');
        // res.status(200).json({ message: MSG_TYPES.PRODUCT_DELETED, product });
    }
    catch (error) {
        // console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.rateProduct(req.params.id, res.body);
        res.status(200).json({ message: msgTypes_1.default.PRODUCT_RATED, product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
const getProductsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.getProductsByUser(req.user.id);
        res.status(200).json({ message: msgTypes_1.default.PRODUCT_FOUND, products });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.default = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    rateProduct,
    getProductsByUser,
    getProductsForDashboard,
    getProductByIdForEdit
};
