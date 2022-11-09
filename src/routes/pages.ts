import express, { Request, Response, NextFunction} from "express";
const router = express.Router();

import ProductController from "../controller/product";
const { upload, fileSizeLimitErrorHandler } = require("../middlewares/multer");
import { verifyToken } from "../middlewares/auth";


    router.get('/', ProductController.getProducts)

    router.get('/show/:id', ProductController.getProductById) 

    router.get('/login', function(req: Request, res: Response, next: NextFunction) {
        res.render('login');
   });
    router.get('/signup', function(req: Request, res: Response, next: NextFunction) {
        res.render('signup');
      }); 

    //logout
    // router.post('/logout',  newUser.logout);

//     router.get('/dashboard', function(req: Request, res: Response, next: NextFunction) {
//         res.render('dashboard');
//    });
    router.get('/addproduct', function(req: Request, res: Response, next: NextFunction) {
        res.render('addproduct');
   });
    router.get('/editproduct', function(req: Request, res: Response, next: NextFunction) {
        res.render('editproduct');
   });

 
export default router