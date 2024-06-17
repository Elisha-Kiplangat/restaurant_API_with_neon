"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatepasswordService = exports.loginService = exports.registerService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const register_1 = __importDefault(require("../mail/register"));
const registerService = async (user) => {
    // console.log('Inserting user:', user);
    await db_1.default.insert(schema_1.AuthTable).values(user);
    await (0, register_1.default)(user.email, 'Registration Successful', user);
    return "User Created Successfully";
};
exports.registerService = registerService;
// add return types to all functions
const loginService = async (user) => {
    const { email, password } = user;
    return await db_1.default.query.AuthTable.findFirst({
        columns: {
            email: true,
            password: true,
            role: true
        }, where: (0, drizzle_orm_1.sql) `${schema_1.AuthTable.email} = ${email}`
    });
};
exports.loginService = loginService;
const updatepasswordService = async (email, password) => {
    await db_1.default.update(schema_1.AuthTable).set({ password }).where((0, drizzle_orm_1.sql) `${schema_1.AuthTable.email} = ${email}`);
    return "Password Updated Successfully";
};
exports.updatepasswordService = updatepasswordService;
// import { sign } from 'jsonwebtoken'; // Assuming you're using jsonwebtoken for signing tokens
// export const updatePasswordService = async (email: string, password: string): Promise<string> => {
//     await db.update(AuthTable).set({ password }).where(sql`${AuthTable.email} = ${email}`);
//     return "Password Updated Successfully";
// };
