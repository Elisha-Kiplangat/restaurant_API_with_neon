import { Hono } from 'hono'
import { statusCatalogController, addStatusCatalogController, oneStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController } from './statusCatalog.controller'
import { statusCatalogSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const statusCatalogRouter = new Hono();

statusCatalogRouter.get('status-catalogs', adminRoleAuth, statusCatalogController);

statusCatalogRouter.get("/status-catalogs/:id", allRoleAuth, oneStatusCatalogController)

statusCatalogRouter.post("status-catalogs", adminRoleAuth, zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addStatusCatalogController)

statusCatalogRouter.put("/status-catalogs/:id", adminRoleAuth, updateStatusCatalogController)

statusCatalogRouter.delete("/status-catalogs/:id", adminRoleAuth, deleteStatusCatalogController)

export default statusCatalogRouter;