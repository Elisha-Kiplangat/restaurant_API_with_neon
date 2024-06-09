"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.addOrderMenuItemService = exports.oneOrderMenuItemService = exports.orderMenuItemService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const orderMenuItemService = async () => {
    try {
        const orderMenuItem = await db_1.default.query.order_menu_itemTable.findMany();
        console.log('cities fetched:', orderMenuItem);
        return orderMenuItem;
    }
    catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
exports.orderMenuItemService = orderMenuItemService;
const oneOrderMenuItemService = async (id) => {
    return await db_1.default.query.order_menu_itemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order_menu_itemTable.id, id)
    });
};
exports.oneOrderMenuItemService = oneOrderMenuItemService;
const addOrderMenuItemService = async (orderMenuItem) => {
    await db_1.default.insert(schema_1.order_menu_itemTable).values(orderMenuItem);
    return "orderMenuItem added successfully";
};
exports.addOrderMenuItemService = addOrderMenuItemService;
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    try {
        const searchedOrderMenuItem = await (0, exports.oneOrderMenuItemService)(id);
        if (!searchedOrderMenuItem) {
            return false;
        }
        await db_1.default.update(schema_1.order_menu_itemTable).set(orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.order_menu_itemTable.id, id));
        return "orderMenuItem updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update orderMenuItem: ");
    }
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.order_menu_itemTable).where((0, drizzle_orm_1.eq)(schema_1.order_menu_itemTable.id, id));
    return "orderMenuItem deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
