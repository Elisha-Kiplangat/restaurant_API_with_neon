"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const registerService = async (user) => {
    // console.log('Inserting user:', user);
    await db_1.default.insert(schema_1.userTable).values(user);
    return "User Created Successfully";
};
exports.registerService = registerService;
const loginService = async (user) => {
    const { email, password } = user;
    return await db_1.default.query.userTable.findFirst({
        columns: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            password: true
        }, where: (0, drizzle_orm_1.sql) `${schema_1.userTable.email} = ${email}`
    });
};
exports.loginService = loginService;
