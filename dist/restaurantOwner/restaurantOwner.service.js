"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.addRestaurantOwnerService = exports.oneRestaurantOwnerService = exports.restaurantOwnerService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const restaurantOwnerService = async () => {
    try {
        const restaurantOwner = await db_1.default.query.restaurantOwnerTable.findMany();
        console.log('Restauurant owners fetched:', restaurantOwner);
        return restaurantOwner;
    }
    catch (error) {
        console.error('Error fetching restaurant owners:', error);
        throw error;
    }
};
exports.restaurantOwnerService = restaurantOwnerService;
const oneRestaurantOwnerService = async (id) => {
    return await db_1.default.query.restaurantOwnerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id)
    });
};
exports.oneRestaurantOwnerService = oneRestaurantOwnerService;
const addRestaurantOwnerService = async (restaurantOwner) => {
    await db_1.default.insert(schema_1.restaurantOwnerTable).values(restaurantOwner);
    return "restaurant Owner added successfully";
};
exports.addRestaurantOwnerService = addRestaurantOwnerService;
const updateRestaurantOwnerService = async (id, restaurantOwner) => {
    try {
        const searchedRestaurantOwner = await (0, exports.oneRestaurantOwnerService)(id);
        if (!searchedRestaurantOwner) {
            return false;
        }
        await db_1.default.update(schema_1.restaurantOwnerTable).set(restaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id));
        return "restaurant Owner updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update restaurant Owner: ");
    }
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
const deleteRestaurantOwnerService = async (id) => {
    await db_1.default.delete(schema_1.restaurantOwnerTable).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id));
    return "restaurant Owner deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
