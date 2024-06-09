import db from "../drizzle/db"
import { categoryselect, categoryInsert, categoryTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const categoryService = async (): Promise<categoryselect[]> => {
    try {
        const category = await db.query.categoryTable.findMany();
        console.log('categorys fetched:', category);
        return category;
    } catch (error) {
        console.error('Error fetching categorys:', error);
        throw error;
    }
}

export const oneCategoryService = async (id: number): Promise<categoryselect | undefined> => {
    return await db.query.categoryTable.findFirst({
        where: eq(categoryTable.id, id)
    })
}

export const addCategoryService = async (category: categoryInsert) => {
    await db.insert(categoryTable).values(category)
    return "category added successfully";
}

export const updateCategoryService = async (id: number, category: categoryInsert) => {
    try {
        const searchedCategory = await oneCategoryService(id);
        if (!searchedCategory) {
            return false;
        }
        await db.update(categoryTable).set(category).where(eq(categoryTable.id, id));
        return "Category updated successfully";
    } catch (error) {
        throw new Error("Failed to update category: ");
    }
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
    return "category deleted successfully"
}