"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.addCityService = exports.oneCityService = exports.cityService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const cityService = async () => {
    try {
        const city = await db_1.default.query.cityTable.findMany();
        console.log('cities fetched:', city);
        return city;
    }
    catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
exports.cityService = cityService;
const oneCityService = async (id) => {
    return await db_1.default.query.cityTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.cityTable.id, id)
    });
};
exports.oneCityService = oneCityService;
const addCityService = async (city) => {
    await db_1.default.insert(schema_1.cityTable).values(city);
    return "city added successfully";
};
exports.addCityService = addCityService;
const updateCityService = async (id, city) => {
    try {
        const searchedCity = await (0, exports.oneCityService)(id);
        if (!searchedCity) {
            return false;
        }
        await db_1.default.update(schema_1.cityTable).set(city).where((0, drizzle_orm_1.eq)(schema_1.cityTable.id, id));
        return "city updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update city: ");
    }
};
exports.updateCityService = updateCityService;
const deleteCityService = async (id) => {
    await db_1.default.delete(schema_1.cityTable).where((0, drizzle_orm_1.eq)(schema_1.cityTable.id, id));
    return "city deleted successfully";
};
exports.deleteCityService = deleteCityService;
