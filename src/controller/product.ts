const ProductService = require("../services/product");
const { validateProduct } = require("../utils/product");
const MSG_TYPES = require("../utils/validation/msgTypes");
const { FILE_HOST } = require("../config/env");

const createProduct = async (req: any, res: any) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		console.log(req.body);
		console.log(req.file);
		const filepath = req.file.path.split("public")[1];
		const product = await ProductService.createProduct({
			...req.body,
			image: `${FILE_HOST}${filepath}`,
			authorId: req.user.id,
		});
		res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product });
	} catch (error: any) {
		console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProducts = async (req: any, res: any) => {
	try {
		const products = await ProductService.getProducts();
		res.status(200).json({ message: MSG_TYPES.PRODUCTS_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProductById = async (req: any, res: any) => {
	try {
		const product = await ProductService.getProductById(req.params.id);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const updateProduct = async (req: any, res: any) => {
	try {
		const product = await ProductService.updateProduct(req.params.id, {
			...res.body,
			userId: req.user.id,
		});
		res.status(200).json({ message: MSG_TYPES.PRODUCT_UPDATED, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const deleteProduct = async (req: any, res: any) => {
	try {
		console.log(req.params.id, req.user.id);
		const product = await ProductService.deleteProduct(
			req.params.id,
			req.user.id
		);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_DELETED, product });
	} catch (error: any) {
		console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const rateProduct = async (req: any, res: any) => {
	try {
		const product = await ProductService.rateProduct(req.params.id, res.body);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_RATED, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProductsByUser = async (req: any, res: any) => {
	try {
		const products = await ProductService.getProductsByUser(
			req.user.id,
			req.body
		);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export default {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct, getProductsByUser }
