import {Hono} from 'hono'
import {categoryController, addCategory, oneCategoryController, updateCategoryController, deleteCategoryController} from './category.controller'
import { categorySchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const categoryRouter = new Hono();

categoryRouter.get('categories', adminRoleAuth, categoryController);

categoryRouter.get("/categories/:id", allRoleAuth, oneCategoryController)

categoryRouter.post("categories", adminRoleAuth, zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCategory)

categoryRouter.put("/categories/:id", adminRoleAuth, updateCategoryController)

categoryRouter.delete("/categories/:id", adminRoleAuth, deleteCategoryController)

export default categoryRouter;