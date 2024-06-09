"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.updateAddressService = exports.addAddressService = exports.oneAddressService = exports.addressService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// all users
const addressService = async () => {
    try {
        const address = await db_1.default.query.addressTable.findMany();
        console.log('Addresses fetched:', address);
        return address;
    }
    catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
};
exports.addressService = addressService;
const oneAddressService = async (id) => {
    return await db_1.default.query.addressTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.addressTable.id, id)
    });
};
exports.oneAddressService = oneAddressService;
const addAddressService = async (user) => {
    await db_1.default.insert(schema_1.addressTable).values(user);
    return "Address added successfully";
};
exports.addAddressService = addAddressService;
const updateAddressService = async (id, address) => {
    await db_1.default.update(schema_1.addressTable).set(address).where((0, drizzle_orm_1.eq)(schema_1.addressTable.id, id));
    return "Address updated successfully";
};
exports.updateAddressService = updateAddressService;
const deleteAddressService = async (id) => {
    await db_1.default.delete(schema_1.addressTable).where((0, drizzle_orm_1.eq)(schema_1.addressTable.id, id));
    return "Address deleted successfully";
};
exports.deleteAddressService = deleteAddressService;
