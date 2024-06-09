"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.addMenuItemService = exports.oneMenuItemService = exports.menuItemService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const menuItemService = async () => {
    try {
        const menuItem = await db_1.default.query.menu_itemTable.findMany();
        console.log('Menu items fetched:', menuItem);
        return menuItem;
    }
    catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};
exports.menuItemService = menuItemService;
const oneMenuItemService = async (id) => {
    return await db_1.default.query.menu_itemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.menu_itemTable.id, id)
    });
};
exports.oneMenuItemService = oneMenuItemService;
const addMenuItemService = async (menuItem) => {
    await db_1.default.insert(schema_1.menu_itemTable).values(menuItem);
    return "menuItem added successfully";
};
exports.addMenuItemService = addMenuItemService;
const updateMenuItemService = async (id, menuItem) => {
    try {
        const searchedMenuItem = await (0, exports.oneMenuItemService)(id);
        if (!searchedMenuItem) {
            return false;
        }
        await db_1.default.update(schema_1.menu_itemTable).set(menuItem).where((0, drizzle_orm_1.eq)(schema_1.menu_itemTable.id, id));
        return "menuItem updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update menuItem: ");
    }
};
exports.updateMenuItemService = updateMenuItemService;
const deleteMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.menu_itemTable).where((0, drizzle_orm_1.eq)(schema_1.menu_itemTable.id, id));
    return "menuItem deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
