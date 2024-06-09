import {Hono} from 'hono'
import {categoryController, addCategory, oneCategoryController, updateCategoryController, deleteCategoryController} from './category.controller'
import { categorySchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const categoryRouter = new Hono();

categoryRouter.get('categories', categoryController);

categoryRouter.get("/categories/:id", oneCategoryController)

categoryRouter.post("categories", zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCategory)

categoryRouter.put("/categories/:id", updateCategoryController)

categoryRouter.delete("/categories/:id", deleteCategoryController)

export default categoryRouter;