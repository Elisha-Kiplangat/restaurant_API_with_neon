"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.addRestaurantService = exports.oneRestaurantService = exports.restaurantService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
//All
const restaurantService = async () => {
    try {
        const restaurants = await db_1.default.query.restaurantTable.findMany();
        console.log('Restaurants fetched:', restaurants);
        return restaurants;
    }
    catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};
exports.restaurantService = restaurantService;
//one
const oneRestaurantService = async (id) => {
    return await db_1.default.query.restaurantTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id)
    });
};
exports.oneRestaurantService = oneRestaurantService;
// add
const addRestaurantService = async (restaurant) => {
    await db_1.default.insert(schema_1.restaurantTable).values(restaurant);
    return "Restaurant added successfully";
};
exports.addRestaurantService = addRestaurantService;
//update
const updateRestaurantService = async (id, restaurant) => {
    try {
        const searchedRestaurant = await (0, exports.oneRestaurantService)(id);
        if (!searchedRestaurant) {
            return false;
        }
        await db_1.default.update(schema_1.restaurantTable).set(restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id));
        return "Restaurant updated successfully";
    }
    catch (error) {
        // Handle any errors
        throw new Error("Failed to update restaurant: ");
    }
};
exports.updateRestaurantService = updateRestaurantService;
//delete
const deleteRestaurantService = async (id) => {
    await db_1.default.delete(schema_1.restaurantTable).where((0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id));
    return "Restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
