"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.addDriverService = exports.oneDriverService = exports.driverService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const driverService = async () => {
    try {
        const driver = await db_1.default.query.driverTable.findMany();
        console.log('Drivers fetched:', driver);
        return driver;
    }
    catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
exports.driverService = driverService;
const oneDriverService = async (id) => {
    return await db_1.default.query.driverTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.driverTable.id, id)
    });
};
exports.oneDriverService = oneDriverService;
const addDriverService = async (driver) => {
    await db_1.default.insert(schema_1.driverTable).values(driver);
    return "driver added successfully";
};
exports.addDriverService = addDriverService;
const updateDriverService = async (id, driver) => {
    try {
        const searchedDriver = await (0, exports.oneDriverService)(id);
        if (!searchedDriver) {
            return false;
        }
        await db_1.default.update(schema_1.driverTable).set(driver).where((0, drizzle_orm_1.eq)(schema_1.driverTable.id, id));
        return "driver updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update driver: ");
    }
};
exports.updateDriverService = updateDriverService;
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.driverTable).where((0, drizzle_orm_1.eq)(schema_1.driverTable.id, id));
    return "driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;
