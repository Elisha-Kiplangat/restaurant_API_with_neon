"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.addCategoryService = exports.oneCategoryService = exports.categoryService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const categoryService = async () => {
    try {
        const category = await db_1.default.query.categoryTable.findMany();
        console.log('categorys fetched:', category);
        return category;
    }
    catch (error) {
        console.error('Error fetching categorys:', error);
        throw error;
    }
};
exports.categoryService = categoryService;
const oneCategoryService = async (id) => {
    return await db_1.default.query.categoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id)
    });
};
exports.oneCategoryService = oneCategoryService;
const addCategoryService = async (category) => {
    await db_1.default.insert(schema_1.categoryTable).values(category);
    return "category added successfully";
};
exports.addCategoryService = addCategoryService;
const updateCategoryService = async (id, category) => {
    try {
        const searchedCategory = await (0, exports.oneCategoryService)(id);
        if (!searchedCategory) {
            return false;
        }
        await db_1.default.update(schema_1.categoryTable).set(category).where((0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id));
        return "Category updated successfully";
    }
    catch (error) {
        throw new Error("Failed to update category: ");
    }
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    await db_1.default.delete(schema_1.categoryTable).where((0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id));
    return "category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
