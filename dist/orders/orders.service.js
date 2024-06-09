"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.addOrderService = exports.oneOrderService = exports.orderService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const orderService = async () => {
    try {
        const orders = await db_1.default.query.orderTable.findMany();
        console.log('Orders fetched:', orders);
        return orders;
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
exports.orderService = orderService;
//one
const oneOrderService = async (id) => {
    return await db_1.default.query.orderTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderTable.id, id)
    });
};
exports.oneOrderService = oneOrderService;
// add
const addOrderService = async (order) => {
    await db_1.default.insert(schema_1.orderTable).values(order);
    return "order added successfully";
};
exports.addOrderService = addOrderService;
//update
const updateOrderService = async (id, order) => {
    try {
        const searchedOrder = await (0, exports.oneOrderService)(id);
        if (!searchedOrder) {
            return false;
        }
        await db_1.default.update(schema_1.orderTable).set(order).where((0, drizzle_orm_1.eq)(schema_1.orderTable.id, id));
        return "order updated successfully";
    }
    catch (error) {
        // Handle any errors
        throw new Error("Failed to update order: ");
    }
};
exports.updateOrderService = updateOrderService;
//delete
const deleteOrderService = async (id) => {
    await db_1.default.delete(schema_1.orderTable).where((0, drizzle_orm_1.eq)(schema_1.orderTable.id, id));
    return "order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
