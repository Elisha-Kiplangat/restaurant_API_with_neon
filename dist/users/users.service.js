"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailService = exports.deleteUserService = exports.updateUserService = exports.addUserService = exports.oneUserService = exports.userService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const register_1 = __importDefault(require("../mail/register"));
// all users
const userService = async (limit) => {
    try {
        if (limit) {
            const users = await db_1.default.query.userTable.findMany({
                limit: limit
            });
            return users;
        }
        return await db_1.default.query.userTable.findMany();
    }
    catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};
exports.userService = userService;
const oneUserService = async (id) => {
    return await db_1.default.query.userTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.userTable.id, id)
    });
};
exports.oneUserService = oneUserService;
const addUserService = async (user) => {
    await db_1.default.insert(schema_1.userTable).values(user);
    await (0, register_1.default)(user.email, 'Registration Successful', user);
    return "User added successfully";
};
exports.addUserService = addUserService;
const updateUserService = async (id, user) => {
    try {
        const searchedUser = await (0, exports.oneUserService)(id);
        if (!searchedUser) {
            return false;
        }
        await db_1.default.update(schema_1.userTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
        return "User updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update user: ");
    }
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.userTable).where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
// user details, if a user, get the orders and the state, city, and the order status
const userDetailService = async (id) => {
    return await db_1.default.query.userTable.findMany({
        with: {
            order: {
                columns: {
                    id: true,
                    actualDeliveryTime: true
                }
            },
            address: {
                columns: {
                    streetAddress1: true,
                    deliveryInstructions: true
                }
            }
        },
        where: (0, drizzle_orm_1.eq)(schema_1.userTable.id, id)
    });
};
exports.userDetailService = userDetailService;
