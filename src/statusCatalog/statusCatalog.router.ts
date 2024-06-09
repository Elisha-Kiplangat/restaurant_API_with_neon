import { Hono } from 'hono'
import { statusCatalogController, addStatusCatalogController, oneStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController } from './statusCatalog.controller'
import { statusCatalogSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const statusCatalogRouter = new Hono();

statusCatalogRouter.get('status-catalogs', statusCatalogController);

statusCatalogRouter.get("/status-catalogs/:id", oneStatusCatalogController)

statusCatalogRouter.post("status-catalogs", zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addStatusCatalogController)

statusCatalogRouter.put("/status-catalogs/:id", updateStatusCatalogController)

statusCatalogRouter.delete("/status-catalogs/:id", deleteStatusCatalogController)

export default statusCatalogRouter;