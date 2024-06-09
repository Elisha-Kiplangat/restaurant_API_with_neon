"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.addOrderStatusService = exports.oneOrderStatusService = exports.orderStatusService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const orderStatusService = async () => {
    try {
        const orderStatus = await db_1.default.query.orderStatusTable.findMany();
        console.log('Order status fetched:', orderStatus);
        return orderStatus;
    }
    catch (error) {
        console.error('Error fetching Order status:', error);
        throw error;
    }
};
exports.orderStatusService = orderStatusService;
const oneOrderStatusService = async (id) => {
    return await db_1.default.query.orderStatusTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id)
    });
};
exports.oneOrderStatusService = oneOrderStatusService;
const addOrderStatusService = async (orderStatus) => {
    await db_1.default.insert(schema_1.orderStatusTable).values(orderStatus);
    return "order Status added successfully";
};
exports.addOrderStatusService = addOrderStatusService;
const updateOrderStatusService = async (id, orderStatus) => {
    try {
        const searchedOrderStatus = await (0, exports.oneOrderStatusService)(id);
        if (!searchedOrderStatus) {
            return false;
        }
        await db_1.default.update(schema_1.orderStatusTable).set(orderStatus).where((0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id));
        return "order Status updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update orderStatus: ");
    }
};
exports.updateOrderStatusService = updateOrderStatusService;
const deleteOrderStatusService = async (id) => {
    await db_1.default.delete(schema_1.orderStatusTable).where((0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id));
    return "order Status deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
