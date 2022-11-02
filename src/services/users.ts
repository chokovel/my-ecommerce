import db from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import HttpError from "../utils/httpError";

export const signup = async (data: any) => {
	const { fullname, gender, email, password, address, phone } = data;
	const existingUser = await db.User.findOne({ where: { email } });
	const existingPhone = await db.User.findOne({ where: { email } });
	if (existingUser) {
		throw new HttpError("User already exist", 400);
	}
	if (existingPhone) {
		throw new HttpError("Phone number already exist", 400);
	}

	const salt = await bcrypt.genSalt(10);
	const encryptedPassword = await bcrypt.hash(password, salt);
	const user = await db.User.create({
		fullname,
		gender,
		email,
		password: encryptedPassword,
		address,
		phone,
	});
	delete user.dataValues.password;
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
	return { token, ...user.dataValues };
};

export const login = async (data: any) => {
	const { email, password } = data;
	const user = await db.User.findOne({ where: { email } });
	if (!user) {
		throw new HttpError("Invalid email or password", 400);
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new HttpError("Invalid email or password", 400);
	}
	delete user.dataValues.password;
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
	return { token, ...user.dataValues };
};
