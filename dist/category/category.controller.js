"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.addCategory = exports.oneCategoryController = exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const categoryController = async (c) => {
    try {
        const category = await (0, category_service_1.categoryService)();
        return c.json(category);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.categoryController = categoryController;
const oneCategoryController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Category = await (0, category_service_1.oneCategoryService)(id);
    if (Category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(Category, 200);
};
exports.oneCategoryController = oneCategoryController;
//add Category
const addCategory = async (c) => {
    try {
        const category = await c.req.json();
        const createdCategory = await (0, category_service_1.addCategoryService)(category);
        if (!createdCategory)
            return c.text("User not created", 404);
        return c.json({ msg: createdCategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addCategory = addCategory;
// update Category
const updateCategoryController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedCategory = await (0, category_service_1.oneCategoryService)(id);
        if (searchedCategory == undefined)
            return c.text("Category not found", 404);
        const res = await (0, category_service_1.updateCategoryService)(id, user);
        if (!res)
            return c.text("Category not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const category = await (0, category_service_1.oneCategoryService)(id);
        if (category == undefined)
            return c.text("Category not found", 404);
        const res = await (0, category_service_1.deleteCategoryService)(id);
        if (!res)
            return c.text("Category not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCategoryController = deleteCategoryController;
