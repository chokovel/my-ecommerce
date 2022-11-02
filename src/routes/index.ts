import express from "express";
const router = express.Router();

import UserRoutes from "./users";
import ProductRoutes from "./product";

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use("/", UserRoutes);
router.use("/product", ProductRoutes);

export default router;
