"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRouter = void 0;
const hono_1 = require("hono");
const statusCatalog_controller_1 = require("./statusCatalog.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.statusCatalogRouter = new hono_1.Hono();
exports.statusCatalogRouter.get('status-catalogs', bearAuth_1.adminRoleAuth, statusCatalog_controller_1.statusCatalogController);
exports.statusCatalogRouter.get("/status-catalogs/:id", bearAuth_1.allRoleAuth, statusCatalog_controller_1.oneStatusCatalogController);
exports.statusCatalogRouter.post("status-catalogs", bearAuth_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), statusCatalog_controller_1.addStatusCatalogController);
exports.statusCatalogRouter.put("/status-catalogs/:id", bearAuth_1.adminRoleAuth, statusCatalog_controller_1.updateStatusCatalogController);
exports.statusCatalogRouter.delete("/status-catalogs/:id", bearAuth_1.adminRoleAuth, statusCatalog_controller_1.deleteStatusCatalogController);
exports.default = exports.statusCatalogRouter;
