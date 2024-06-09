"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateService = exports.updateStateService = exports.addStateService = exports.oneStateService = exports.stateService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const stateService = async () => {
    try {
        const state = await db_1.default.query.stateTable.findMany();
        console.log('States fetched:', state);
        return state;
    }
    catch (error) {
        console.error('Error fetching states:', error);
        throw error;
    }
};
exports.stateService = stateService;
const oneStateService = async (id) => {
    return await db_1.default.query.stateTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.stateTable.id, id)
    });
};
exports.oneStateService = oneStateService;
const addStateService = async (state) => {
    await db_1.default.insert(schema_1.stateTable).values(state);
    return "State added successfully";
};
exports.addStateService = addStateService;
const updateStateService = async (id, state) => {
    try {
        // First, check if the user with the given ID exists
        const searchedState = await (0, exports.oneStateService)(id);
        if (!searchedState) {
            // If user not found, return false to indicate failure
            return false;
        }
        await db_1.default.update(schema_1.stateTable).set(state).where((0, drizzle_orm_1.eq)(schema_1.stateTable.id, id));
        return "State updated successfully";
    }
    catch (error) {
        // Handle any errors
        throw new Error("Failed to update state: ");
    }
};
exports.updateStateService = updateStateService;
const deleteStateService = async (id) => {
    await db_1.default.delete(schema_1.stateTable).where((0, drizzle_orm_1.eq)(schema_1.stateTable.id, id));
    return "State deleted successfully";
};
exports.deleteStateService = deleteStateService;
