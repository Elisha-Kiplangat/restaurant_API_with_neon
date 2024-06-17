"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.requestPasswordResetController = exports.verifyResetToken = exports.generateResetToken = exports.updatepasswordController = exports.loginController = exports.registerController = void 0;
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
                sub: userExist?.email,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hour  => SESSION EXPIRATION
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await (0, jwt_1.sign)(payload, secret); // create a JWT token
            let user = userExist?.email;
            let role = userExist?.role;
            return c.json({ token, user: { role, user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginController = loginController;
const updatepasswordController = async (c) => {
    try {
        const { email, password } = await c.req.json();
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const message = await (0, auth_service_1.updatepasswordService)(email, hashedPass);
        return c.json({ msg: message }, 200);
    }
    catch (error) {
        if (error.message === "User not found") {
            return c.json({ error: "User not found" }, 404);
        }
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
};
exports.updatepasswordController = updatepasswordController;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const reset_1 = __importDefault(require("../mail/reset"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { generateResetToken } from './auth.service'; // Moved token generation to a service
const generateResetToken = async (user) => {
    const payload = {
        email: user.email
    };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRESIN;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
    return token;
};
exports.generateResetToken = generateResetToken;
const verifyResetToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyResetToken = verifyResetToken;
const requestPasswordResetController = async (c) => {
    try {
        const { email } = await c.req.json();
        // Get user info
        const user = await db_1.default.select().from(schema_1.AuthTable).where((0, drizzle_orm_1.sql) `${schema_1.AuthTable.email} = ${email}`).limit(1);
        if (user.length === 0) {
            return c.json({ error: "User not found" }, 404);
        }
        // Generate reset token
        const token = await (0, exports.generateResetToken)(user[0]); // Pass the user object
        const userName = user[0].email; // Adjust based on your actual user table structure
        // Prepare data for the email template
        const resetLink = `https://restaurant-mngt.azurewebsites.net/reset-password?token=${token}`;
        const data = { email, resetLink, appName: 'Restaurant' };
        // Send reset password email
        await (0, reset_1.default)(email, 'Password Reset Request', data); // Pass data to the mail function
        return c.json({ msg: 'Password reset email sent successfully' }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
};
exports.requestPasswordResetController = requestPasswordResetController;
const resetPasswordController = async (c) => {
    try {
        const { token, newPassword } = await c.req.json();
        const decoded = (0, exports.verifyResetToken)(token);
        const email = decoded.email;
        // Update the user's password in the database
        await db_1.default.update(schema_1.AuthTable).set({ password: newPassword }).where((0, drizzle_orm_1.sql) `${schema_1.AuthTable.email} = ${email}`);
        return c.json({ msg: 'Password reset successful' }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
};
exports.resetPasswordController = resetPasswordController;
