import express from "express";
const router = express.Router();

import ProductController from "../controller/product";
const { upload, fileSizeLimitErrorHandler } = require("../middlewares/multer");
const verifyToken = require("../middlewares/auth");

router.post(
	"/",
	verifyToken,
	upload?.single("image"),
	fileSizeLimitErrorHandler,
	ProductController.createProduct
);

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getProductById);

router.put(
	"/:id",
	verifyToken,
	upload?.single("image"),
	fileSizeLimitErrorHandler,
	ProductController.updateProduct
);

router.delete("/:id", verifyToken, ProductController.deleteProduct);

router.post("/:id/reviews", ProductController.rateProduct);

router.get("/:user/products", verifyToken, ProductController.getProductsByUser);

export default router;

function single(
	arg0: string
): import("express-serve-static-core").RequestHandler<
	{},
	any,
	any,
	import("qs").ParsedQs,
	Record<string, any>
> {
	throw new Error("Function not implemented.");
}
