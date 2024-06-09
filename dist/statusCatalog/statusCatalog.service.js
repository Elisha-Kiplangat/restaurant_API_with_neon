"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogService = exports.updateStatusCatalogService = exports.addStatusCatalogService = exports.oneStatusCatalogService = exports.statusCatalogService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const statusCatalogService = async () => {
    try {
        const statusCatalog = await db_1.default.query.statusCatalogTable.findMany();
        console.log('Status catalog fetched:', statusCatalog);
        return statusCatalog;
    }
    catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
};
exports.statusCatalogService = statusCatalogService;
const oneStatusCatalogService = async (id) => {
    return await db_1.default.query.statusCatalogTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id)
    });
};
exports.oneStatusCatalogService = oneStatusCatalogService;
const addStatusCatalogService = async (statusCatalog) => {
    await db_1.default.insert(schema_1.statusCatalogTable).values(statusCatalog);
    return "statusCatalog added successfully";
};
exports.addStatusCatalogService = addStatusCatalogService;
const updateStatusCatalogService = async (id, statusCatalog) => {
    try {
        const searchedStatusCatalog = await (0, exports.oneStatusCatalogService)(id);
        if (!searchedStatusCatalog) {
            return false;
        }
        await db_1.default.update(schema_1.statusCatalogTable).set(statusCatalog).where((0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id));
        return "statusCatalog updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update statusCatalog: ");
    }
};
exports.updateStatusCatalogService = updateStatusCatalogService;
const deleteStatusCatalogService = async (id) => {
    await db_1.default.delete(schema_1.statusCatalogTable).where((0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id));
    return "statusCatalog deleted successfully";
};
exports.deleteStatusCatalogService = deleteStatusCatalogService;
