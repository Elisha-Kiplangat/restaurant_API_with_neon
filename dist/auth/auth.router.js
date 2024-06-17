"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_controller_1 = require("./auth.controller");
exports.authRouter = new hono_1.Hono();
exports.authRouter.post('register', (0, zod_validator_1.zValidator)('json', validator_1.registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.registerController);
// authRouter.post("auth", zValidator('json', registerSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), registerController)
exports.authRouter.post('login', (0, zod_validator_1.zValidator)('json', validator_1.loginSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.loginController);
exports.authRouter.put('update-password', (0, zod_validator_1.zValidator)('json', validator_1.updatePassSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.updatepasswordController);
exports.authRouter.post('request-password-reset', auth_controller_1.requestPasswordResetController);
exports.authRouter.post('reset-password', auth_controller_1.resetPasswordController);
const ejs_1 = require("ejs");
const path_1 = __importDefault(require("path"));
exports.authRouter.get('reset-password', async (c) => {
    const token = c.req.query('token');
    const filePath = path_1.default.join(__dirname, '../ejs', 'form.ejs');
    const html = await (0, ejs_1.renderFile)(filePath, { token });
    c.header('Content-Type', 'text/html');
    c.body(html);
});
