"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const registerController = async (c) => {
    try {
        const user = await c.req.json();
        console.log('Registering user:', user);
        const pass = user.password;
        const hashedPass = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPass;
        const createdUser = await (0, auth_service_1.registerService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerController = registerController;
const loginController = async (c) => {
    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await (0, auth_service_1.loginService)(user);
        if (userExist === null)
            return c.json({ error: "User not found" }, 404); // not found         
        const userMatch = await bcrypt_1.default.compare(user.password, userExist?.password);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401); // unauthorized
        }
        else {
            // create a payload
            const payload = {
                sub: userExist?.firstName,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hour  => SESSION EXPIRATION
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await (0, jwt_1.sign)(payload, secret); // create a JWT token
            let user = userExist?.firstName;
            let role = userExist?.role;
            return c.json({ token, user: { role, user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginController = loginController;
