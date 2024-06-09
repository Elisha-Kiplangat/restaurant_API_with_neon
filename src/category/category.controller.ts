import { Context } from "hono";
import { categoryService, oneCategoryService, addCategoryService, updateCategoryService, deleteCategoryService } from "./category.service";

export const categoryController = async (c: Context) => {
    try{
        const category = await categoryService();
        return c.json(category);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
}

export const oneCategoryController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Category = await oneCategoryService(id);
    if (Category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(Category, 200);
}

//add Category

export const addCategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const createdCategory = await addCategoryService(category);

        if (!createdCategory) return c.text("User not created", 404);
        return c.json({ msg: createdCategory }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update Category

export const updateCategoryController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedCategory = await oneCategoryService(id);
        if (searchedCategory == undefined) return c.text("Category not found", 404);

        const res = await updateCategoryService(id, user);

        if (!res) return c.text("Category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCategoryController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const category = await oneCategoryService(id);
        if (category == undefined) return c.text("Category not found", 404);

        const res = await deleteCategoryService(id);
        if (!res) return c.text("Category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}