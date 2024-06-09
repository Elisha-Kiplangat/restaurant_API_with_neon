import db from "../drizzle/db"
import { menu_itemTable, MenuItemselect, MenuItemInsert } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const menuItemService = async (): Promise<MenuItemselect[]> => {
    try {
        const menuItem = await db.query.menu_itemTable.findMany();
        console.log('Menu items fetched:', menuItem);
        return menuItem;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
}

export const oneMenuItemService = async (id: number): Promise<MenuItemselect | undefined> => {
    return await db.query.menu_itemTable.findFirst({
        where: eq(menu_itemTable.id, id)
    })
}

export const addMenuItemService = async (menuItem: MenuItemInsert) => {
    await db.insert(menu_itemTable).values(menuItem)
    return "menuItem added successfully";
}

export const updateMenuItemService = async (id: number, menuItem: MenuItemInsert) => {
    try {
        const searchedMenuItem = await oneMenuItemService(id);
        if (!searchedMenuItem) {
            return false;
        }
        await db.update(menu_itemTable).set(menuItem).where(eq(menu_itemTable.id, id));
        return "menuItem updated successfully";
    } catch (error) {
        throw new Error("Failed to update menuItem: ");
    }
}

export const deleteMenuItemService = async (id: number) => {
    await db.delete(menu_itemTable).where(eq(menu_itemTable.id, id));
    return "menuItem deleted successfully"
}