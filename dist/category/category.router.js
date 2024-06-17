"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const hono_1 = require("hono");
const category_controller_1 = require("./category.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.categoryRouter = new hono_1.Hono();
exports.categoryRouter.get('categories', bearAuth_1.adminRoleAuth, category_controller_1.categoryController);
exports.categoryRouter.get("/categories/:id", bearAuth_1.allRoleAuth, category_controller_1.oneCategoryController);
exports.categoryRouter.post("categories", bearAuth_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), category_controller_1.addCategory);
exports.categoryRouter.put("/categories/:id", bearAuth_1.adminRoleAuth, category_controller_1.updateCategoryController);
exports.categoryRouter.delete("/categories/:id", bearAuth_1.adminRoleAuth, category_controller_1.deleteCategoryController);
exports.default = exports.categoryRouter;
