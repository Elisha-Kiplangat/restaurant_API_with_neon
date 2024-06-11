"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
//AUTHENTICATION MIDDLEWARE
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//AUTHORIZATION MIDDLEWARE
const authMiddleware = async (c, next, requiredRole) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "Token not provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decoded)
        return c.json({ error: "Invalid token" }, 401);
    if (decoded.role !== requiredRole)
        return c.json({ error: "Unauthorized" }, 401);
    return next();
};
exports.authMiddleware = authMiddleware;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
