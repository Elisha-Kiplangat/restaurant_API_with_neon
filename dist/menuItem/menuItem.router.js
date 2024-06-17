"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const hono_1 = require("hono");
const menuItem_controller_1 = require("./menuItem.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.menuItemRouter = new hono_1.Hono();
exports.menuItemRouter.get('menu-items', bearAuth_1.adminRoleAuth, menuItem_controller_1.menuItemController);
exports.menuItemRouter.get("/menu-items/:id", bearAuth_1.allRoleAuth, menuItem_controller_1.oneMenuItemController);
exports.menuItemRouter.post("menu-items", bearAuth_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), menuItem_controller_1.addMenuItem);
exports.menuItemRouter.put("/menu-items/:id", bearAuth_1.adminRoleAuth, menuItem_controller_1.updateMenuItemController);
exports.menuItemRouter.delete("/menu-items/:id", bearAuth_1.adminRoleAuth, menuItem_controller_1.deleteMenuItemController);
exports.default = exports.menuItemRouter;
