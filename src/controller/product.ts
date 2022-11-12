import ProductService from "../services/product";
import { Request, Response } from "express";
import validateProduct from "../utils/product";
import MSG_TYPES from "../utils/validation/msgTypes";
import envsecret from "../config/env";

const createProduct = async (req: any, res: any) => {
	try {
		delete req.body?.image
		const { error } = validateProduct(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const filepath = req.file.path.split("public")[1];
		const product = await ProductService.createProduct({
			...req.body,
			image: `${envsecret.FILE_HOST}${filepath}`,
			authorId: res.locals?.user?.id,
		});
		res.status(201).redirect('dashboard');
		// res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product });
	} catch (error: any) {
		// console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProductsForDashboard = async (req: Request, res: Response) => {
	try {
		let products = await ProductService.getProductsByUser(res.locals?.user?.id);
		// console.log("produtscddd",  products);

		res.status(200).render('dashboard', { products });

	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

const getProducts = async (req: any, res: any) => {
	try {
		let products = await ProductService.getProducts();
		
		res.status(200).render('index.ejs', { products: products });
		// res.status(200).json({ message: MSG_TYPES.PRODUCTS_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProductById = async (req: any, res: any) => {
	try {
		const product = await ProductService.getProductById(req.params.id);
		res.status(200).render('show', {section: product});
		// res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const getProductByIdForEdit = async (req: Request, res: Response) => {
	try {
		const product = await ProductService.getProductById(+req.params.id);
		res.status(200).render('editproduct', {product});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

const updateProduct = async (req: any, res: any) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) {
			return res.status(400).json({error});
		}
		// console.log(req.body);
		// console.log(req.file);
		const filepath = req.file.path.split("public")[1];
		const product = await ProductService.updateProduct(req.params.id, {
			...req.body,
			userId: res.locals.user.id,
			image: `${envsecret.FILE_HOST}${filepath}`,
		});
		// res.status(200).json({ message: MSG_TYPES.PRODUCT_UPDATED, product });
		res.status(301).redirect('/dashboard');
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

const deleteProduct = async (req: any, res: any) => {
	try {
		// console.log(req.params.id, req.user.id);
		const product = await ProductService.deleteProduct(
			req.params.id,
			res.locals?.user?.id
		);
		res.status(301).redirect('/dashboard');
		// res.status(200).json({ message: MSG_TYPES.PRODUCT_DELETED, product });
	} catch (error: any) {
		// console.log(error);
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
			req.user.id
		);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};



export default {
	createProduct,  
	getProducts, 
	getProductById, 
	updateProduct, 
	deleteProduct, 
	rateProduct, 
	getProductsByUser,
	getProductsForDashboard,
	getProductByIdForEdit
}
