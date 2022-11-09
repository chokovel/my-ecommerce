import express from 'express';
const UserRoutes = express.Router();

import * as UserControllers from "../controller/users";

UserRoutes.post("/signup", UserControllers.signup);
UserRoutes.post("/login", UserControllers.login);
// UserRoutes.post("/logout", UserControllers.logout);




export default UserRoutes; 