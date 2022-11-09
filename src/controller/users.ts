import { Request, Response } from "express";
import * as UserServices from "../services/users";
import { validateUser, validateLogin } from "../utils/usersValidation";
import MSG_TYPES from "../utils/validation/msgTypes";
import ProductService from "../services/product";
import { Session } from "inspector";

declare module 'express-session' {
    interface SessionData {
        user: any
    }
}

export const signup = async (req: Request, res: Response) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.signup(req.body);
		res.status(201).redirect('/dashboard');
		// res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

// export const logout = async (req: Request, res: Response) => {
// 	if(req.session){
// 		req.session.destroy(() => {
// 			req.logout:();
// 			req.flash('success','Successfully logged out!');
// 			res.redirect("/");)
// 	}
// }

export const login = async (req: Request, res: Response) => {
	try {
		const { error } = validateLogin(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.login(req.body);
		const products = await ProductService.getProductsByUser(
			user.id
		);
		
		
		req.session.regenerate(function (err) {
			if (err) throw new Error(err)
			
			// store user information in session, typically a user id
			req.session.user = user;
			req.session.save(function (err) {
			  if (err) throw new Error(err)
			//   res.status(200).render('dashboard');
			res.status(301).redirect('dashboard');
			})
		})
		return;

		// res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};


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